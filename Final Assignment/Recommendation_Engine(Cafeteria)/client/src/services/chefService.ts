import { Socket } from 'socket.io-client';
import * as readline from 'readline';
import UserPromptUtils from '../utils/userPromptUtils';

class ChefMenuService {
    private promptUtils: UserPromptUtils;

    constructor(private rl: readline.Interface, private socket: Socket) {
        this.promptUtils = new UserPromptUtils(this.rl);
    }

    public async showMenu() {
        console.log('Type 1 to view all the Menu Items');
        console.log('Type 2 to View all the feedbacks');
        console.log('Type 3 to View recommended food');
        console.log('Type 3 to vote for menu items');
        console.log('Type 5 to exit');
        
        const selectedOption = await this.promptUtils.askQuestion('Please select the operation you want to perform: ');

        switch (selectedOption) {
            case '1':
                this.viewAllMenuItems();
                break;
            case '2':
                this.viewAllFeedbacks();
                break;
            case '3':
                await this.getRecommendedFood();
                break;
            case '4':
                await this.viewVotedItems();
                break;
            case '5':
                console.log('Exiting...');
                this.rl.close();
                this.socket.disconnect();
                break;
            default:
                console.log('Invalid option, please try again.');
                await this.showMenu();
                break;
        }
    }

    private viewAllMenuItems() {
        this.socket.emit('getAllMenuItems');
    }

    private viewAllFeedbacks() {
        this.socket.emit('getAllFeedback');
    }

    private async getRecommendedFood() {
        // const category = this.userInput();
        console.log('Type 1 for Breakfast');
        console.log('Type 2 for Lunch');
        console.log('Type 3 for Dinner');
        
        const categoryChoice = await this.promptUtils.askQuestion('Enter choice: ');

        let category: string;
        switch (categoryChoice) {
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
                console.log('Invalid choice, defaulting to Breakfast.');
                category = 'Breakfast';
                break;
        }
        await this.socket.emit('getRecommendedFood', { category });
    }

    public async rolloutRecommendedMenu(){
        const selectedItemId = await this.promptUtils.askQuestion('Enter all the itemId you want to roll out: ');
        this.socket.emit('rolloutRecommendedFood', { selectedItemId });
    }

    private async viewVotedItems(){
        console.log('Type 1 for Breakfast');
        console.log('Type 2 for Lunch');
        console.log('Type 3 for Dinner');
        
        const categoryChoice = await this.promptUtils.askQuestion('Enter choice: ');

        let category: string;
        switch (categoryChoice) {
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
                console.log('Invalid choice, defaulting to Breakfast.');
                category = 'Breakfast';
                break;
        }
        // return category;
        await this.socket.emit('viewVotes', { category });
    }

    private async userInput(){
        console.log('Type 1 for Breakfast');
        console.log('Type 2 for Lunch');
        console.log('Type 3 for Dinner');
        
        const categoryChoice = await this.promptUtils.askQuestion('Enter choice: ');

        let category: string;
        switch (categoryChoice) {
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
                console.log('Invalid choice, defaulting to Breakfast.');
                category = 'Breakfast';
                break;
        }
        return category;
    }
}

export default ChefMenuService;
