import { Socket } from 'socket.io-client';
import adminMenuService from '../services/adminService';
import chefMenuService from '../services/chefService';
import * as readline from 'readline';
import employeeMenuService from '../services/employeeService';
import { CredentialPrompter } from './promptUtils';

export class SocketManager {
    private credentialPrompter: CredentialPrompter;

    constructor(
        private socket: Socket,
        private rl: readline.Interface,
        private adminMenuService: adminMenuService,
        private chefMenuService: chefMenuService,
        private employeeMenuService: employeeMenuService,
    ) {
        this.credentialPrompter = new CredentialPrompter(this.socket, this.rl);
    }

    public setupSocketEvents() {
        // eslint-disable-next-line no-var
        var userRole = 'Employee';
        let userId = 0;
        this.socket.on('connect', () => {
            console.log(`Connected to server with ID: ${this.socket.id}`);
            this.credentialPrompter.promptCredentials();
        });

        this.socket.on('authResult', (data: { message: string, role: string, userId:number }) => {
            console.log(data.message);
            userRole = data.role;
            userId = data.userId
            if (data.role === 'Admin') {
                this.adminMenuService.showMenu(data.role);
            } else if (data.role === 'Chef') {
                this.chefMenuService.showMenu();
            } else if (data.role === 'Employee'){
                this.employeeMenuService.showMenu(data.userId);
            }
        });

        this.socket.on('menuItemAddResult', (message: string) => {
            console.log('_____________________________________________________________________');
            console.log(message);
            this.adminMenuService.showMenu('Admin');
        });

        this.socket.on('menuItemUpdateResult', (message: string) => {
            console.log('_____________________________________________________________________');
            console.log(message);
            this.adminMenuService.showMenu('Admin');
        });

        this.socket.on('allMenuItems', (items: any[]) => {
            console.log('_____________________________________________________________________');
            console.log('Menu Items:');
            console.table(items.map(item => ({
                ID: item.ItemId,
                Name: item.ItemName,
                Category: item.category,
                Rating: item.rating
            })));
            console.log('_____________________________________________________________________');
            if(userRole === 'Admin'){
                this.adminMenuService.showMenu(userRole);
            } else if (userRole === 'Chef'){
                this.chefMenuService.showMenu();
            } else if (userRole === 'Employee'){
                this.employeeMenuService.showMenu(userId);
            }
        });

        this.socket.on('getFeedback', (feedbacks: any[]) => {
            console.log('_____________________________________________________________________');
            console.log('User Feedback:');
            console.table(feedbacks.map(feedback => ({
                ItemName: feedback.ItemName,
                Rating: feedback.rating,
                Comment: feedback.comment
            })));
            console.log('_____________________________________________________________________');
            if(userRole === 'Admin'){
                this.adminMenuService.showMenu(userRole);
            }else if (userRole === 'Chef'){
                this.chefMenuService.showMenu();
            }
        });

        this.socket.on('deleteItem', (message: string) => {
            console.log(message);
            console.log('_____________________________________________________________________');
            this.adminMenuService.showMenu('Admin');
        });

        this.socket.on('recommendedFood', (MenuItems: any[]) => {
            console.log('_____________________________________________________________________');
            console.log('Recommended Food By Engine:');
            console.table(MenuItems.map(item => ({
                ItemId : item.itemId,
                ItemName: item.foodItem,
                Rating: item.avgRating,
                Sentiment: item.avgSentimentRating,
                OverallRating: item.combinedAvg
            })));
            console.log('_____________________________________________________________________');
            this.chefMenuService.rolloutRecommendedMenu();
        });

        this.socket.on('recommendedItemsByChef', (recommendedItems: any[]) => {
            console.log('_____________________________________________________________________');
            console.log('Recommended Food:');
            console.table(recommendedItems.map(item => ({
                ItemId : item.ItemId,
                ItemName: item.ItemName,
                Category: item.category,
                Rating: item.rating,
                Vote: item.vote
            })));
            console.log('_____________________________________________________________________');
            if(userRole === 'Admin'){
                this.adminMenuService.showMenu(userRole);
            }else if (userRole === 'Chef'){
                this.chefMenuService.showMenu();
            }
        });
        
        this.socket.on('rolloutMenu', (message: string) => {
            console.log(message);
            console.log('_____________________________________________________________________');
            this.chefMenuService.showMenu();
        });

        this.socket.on('feedbackReceived',(message: string) => {
            console.log(message);
            this.employeeMenuService.showMenu(userId);
        });

        this.socket.on('votedMenuItems', (votedItems:any[]) => {
            console.log('_____________________________________________________________________');
            console.log('Voted Food Items:');
            console.table(votedItems.map(item => ({
                ItemId : item.itemId,
                ItemName: item.itemName,
                Category: item.category,
                Rating: item.rating,
                RolloutDate: item.rolloutDate, 
                Vote: item.vote
            })));
            console.log('_____________________________________________________________________');
            if (userRole === 'Chef'){
                this.chefMenuService.showMenu();
            } else if (userRole === 'Employee'){
                this.employeeMenuService.showMenu(userId);
            }
        });

        this.socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });
    }
}
