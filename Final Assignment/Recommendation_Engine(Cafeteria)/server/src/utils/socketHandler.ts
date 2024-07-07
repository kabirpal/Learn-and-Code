import { Socket } from 'socket.io';
import { MenuItemService } from '../services/menuItemService';
import { FeedbackService } from '../services/feedbackService';
import { RecommendationService } from '../services/recommendationService';
import MySQLConnection from '../database/mySQLConnection';

class SocketHandler {
    private menuItemService: MenuItemService;
    private feedbackService: FeedbackService;
    private recommendationService: RecommendationService;

    constructor(dbConnection: MySQLConnection) {
        this.menuItemService = new MenuItemService(dbConnection);
        this.feedbackService = new FeedbackService(dbConnection);
        this.recommendationService = new RecommendationService(this.feedbackService,dbConnection);
    }

    public handleSocketOperations(socket: Socket): void {
        socket.on('addMenuItem', async (menuItem) => {
            try {
                await this.menuItemService.addMenuItem(menuItem);
                socket.emit('menuItemAddResult', 'Menu item added successfully.');
            } catch (error) {
                console.error('Database query error:', error);
                socket.emit('menuItemAddResult', 'Error adding menu item.');
            }
        });

        socket.on('updateMenuItem', async (menuItem) => {
            try {
                await this.menuItemService.updateMenuItem(menuItem);
                socket.emit('menuItemUpdateResult', 'Menu item updated successfully.');
            } catch (error) {
                console.error('Database query error:', error);
                socket.emit('menuItemUpdateResult', 'Error updating menu item.');
            }
        });

        socket.on('getAllMenuItems', async () => {
            try {
                const menuItems = await this.menuItemService.getAllMenuItems();
                socket.emit('allMenuItems', menuItems);
            } catch (error) {
                console.error('Database query error:', error);
                socket.emit('allMenuItems', 'Error in viewing menu item.');
            }
        });

        socket.on('getAllFeedback', async () => {
            try {
                const feedbacks = await this.feedbackService.getAllFeedback();
                socket.emit('getFeedback', feedbacks);
            } catch (error) {
                console.error('Database query error:', error);
                socket.emit('getFeedback', 'Error in fetching feedback.');
            }
        });

        socket.on('deleteFromMenu', async (menuItem) => {
            try {
                await this.menuItemService.deleteMenuItem(menuItem.id);
                socket.emit('deleteItem', 'Menu item deleted successfully.');
            } catch (error) {
                console.error('Database query error:', error);
                socket.emit('deleteItem', 'Error deleting menu item.');
            }
        });

        socket.on('getRecommendedFood', async (itemCategory) => {
            try {
                const feedbackWithAverages = await this.recommendationService.getRecommendedFood(itemCategory.category);
                socket.emit('recommendedFood', feedbackWithAverages);
            } catch (error) {
                console.error('Database query error:', error);
                socket.emit('recommendedFood', 'Error in fetching feedback.');
            }
        });

        socket.on('rolloutRecommendedFood', async (itemCategory) => {
            try {
                const recommendedItems = await this.recommendationService.analyzeRolloutInput(itemCategory);
                console.log('Recommended items',recommendedItems);
                socket.emit('recommendedItemsByChef', recommendedItems);
            } catch (error) {
                console.error('Database query error:', error);
                socket.emit('recommendedItemsByChef', 'Error in fetching feedback.');
            }
        });

        socket.on('sendFeedback', async (userFeedback)=>{
            console.log(userFeedback);
            try {
                await this.feedbackService.insertUserFeedback(userFeedback);
                console.log('Feedback entered');
                socket.emit('feedbackReceived','Feedback entered successfully.');
            } catch (error) {
                console.error('Database query error:', error);
            }
        });

        socket.on('viewVotes', async (itemCategory) =>{
            try{
                console.log(itemCategory);
                const votedItems = await this.feedbackService.viewEmployeeVotes(itemCategory);
                socket.emit('votedMenuItems',votedItems);
            } catch(error) {
                console.error('Database query error:', error);
            }
        });
    }
}

export default SocketHandler;
