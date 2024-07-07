import { FeedbackData } from './interface/feedbackData';
import { FoodItemStats } from './interface/foodItemStats';
import { FeedbackAnalyzer } from './service/feedbackAnalyzer';
import { FeedbackHandler } from './service/feedbackHandler';

export class Engine {
    private feedbackData: FeedbackData[];
    private feedbackCalculator: FeedbackAnalyzer;
    private feedbackSorter: FeedbackHandler;

    constructor(feedbackData: FeedbackData[]) {
        this.feedbackData = feedbackData;
        this.feedbackCalculator = new FeedbackAnalyzer(feedbackData);
        this.feedbackSorter = new FeedbackHandler();
    }

    public getTop5ByCombinedAvg(): FoodItemStats[] {
        const averages = this.feedbackCalculator.calculateAverages();
        return this.feedbackSorter.getTopOverallAvg(averages);
    }
}


