import { Socket } from 'socket.io-client';
import * as readline from 'readline';
import UserPromptUtils from '../utils/userPromptUtils';

class EmployeeMenuService {
    private promptUtils: UserPromptUtils;

    constructor(private rl: readline.Interface, private socket: Socket) {
        this.promptUtils = new UserPromptUtils(this.rl);
    }

    public async showMenu(userId:number) {
        console.log('user Id: ',userId)
        console.log('Type 1 to view all menu items');
        console.log('Type 2 to give Feedback');
        console.log('Type 3 to see the notifications');
        console.log('Type 4 to give response on Rollout Menu');
        console.log('Type 5 to exit');

        const selectedOption = await this.promptUtils.askQuestion('Please select the operation you want to perform: ');

        switch (selectedOption) {
            case '1':
                this.viewAllMenuItems();
                break;
            case '2':
                await this.giveFeedback(userId);
                break;
            case '3':
                await this.giveFeedback(userId);
                break;
            case '4':
                await this.giveResponseToRolloutMenu();
                break;
            case '5':
                console.log('Exiting...');
                this.rl.close();
                this.socket.disconnect();
                break;
            default:
                console.log('Invalid option, please try again.');
                await this.showMenu(userId);
                break;
        }
    }

    private viewAllMenuItems() {
        this.socket.emit('getAllMenuItems');
    }

    private async giveFeedback(userId:number) {
        const itemId = await this.promptUtils.askQuestion('Enter the menu item ID you want to give feedback for: ');
        const rating = await this.promptUtils.askQuestion('Enter your rating (1-5): ');
        const comment = await this.promptUtils.askQuestion('Enter your feedback comment: ');
        this.socket.emit('sendFeedback', { userId, itemId, rating, comment });
    }

    private async giveResponseToRolloutMenu() {
        const itemId = await this.promptUtils.askQuestion('Enter the menu item Id you want to vote for: ');
        this.socket.emit('sendResponseOnRollout',itemId);
    }
}

export default EmployeeMenuService;
