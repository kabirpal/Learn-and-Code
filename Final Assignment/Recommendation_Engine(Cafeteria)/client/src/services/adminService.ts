import { Socket } from 'socket.io-client';
import * as readline from 'readline';
import UserPromptUtils from '../utils/userPromptUtils';

class AdminMenuService {
    private promptUtils: UserPromptUtils;

    constructor(private rl: readline.Interface, private socket: Socket) {
        this.promptUtils = new UserPromptUtils(this.rl);
    }

    public async showMenu(role: string) {
        console.log('Type 1 to Add New Item to Menu');
        console.log('Type 2 to Update an Existing Menu Item');
        console.log('Type 3 to View All Menu Items');
        console.log('Type 4 to Delete an item fom Menu');
        console.log('Type 5 to Exit');
        const selectedOption = await this.promptUtils.askQuestion('Please select the operation you want to perform: ');

        switch (selectedOption) {
            case '1':
                await this.addNewMenuItem(role);
                break;
            case '2':
                await this.updateMenuItem();
                break;
            case '3':
                this.viewAllMenuItems();
                break;
            case '4':
                await this.deleteItem();
                break;
            case '5':
                console.log('Exiting...');
                this.rl.close();
                this.socket.disconnect();
                break;
            default:
                console.log('Invalid option, please try again.');
                await this.showMenu(role);
                break;
        }
    }

    private async addNewMenuItem(role: string) {
        const name = await this.promptUtils.askQuestion('Enter menu item name: ');
        let category = await this.promptUtils.askQuestion('Enter menu item category: ');
        const rating = await this.promptUtils.askQuestion('Enter menu item rating: ');
        category = this.itemCategory(category);
        this.socket.emit('addMenuItem', { name, category, rating, role });
    }

    private async updateMenuItem() {
        const id = await this.promptUtils.askQuestion('Enter the ID of the menu item to update: ');
        const name = await this.promptUtils.askQuestion('Enter new menu item name: ');
        let category = await this.promptUtils.askQuestion('Enter new menu item category: ');
        const rating = await this.promptUtils.askQuestion('Enter new menu item rating: ');
        category = this.itemCategory(category);
        this.socket.emit('updateMenuItem', { id, name, category, rating });
    }

    private viewAllMenuItems() {
        this.socket.emit('getAllMenuItems');
    }

    private async deleteItem() {
        const id = await this.promptUtils.askQuestion('Enter item id to delete: ');
        this.socket.emit('deleteFromMenu', { id });
    }

    private itemCategory(categoryId: string){
        let category = '';
        switch (categoryId) {
            case '1':
                category = 'Breakfast';
                break;
            case '2':
                category = 'Lunch';
                break;
            case '3':
                category = 'Dinner';
                break;
            default:
                category = 'Dinner';
                break;
        }
        return category;
    }
}

export default AdminMenuService;
