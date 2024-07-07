import { GmailService } from './gmailService';


export class EmailService {
    static async getEmailDetails(): Promise<{ emailAddress: any; messagesTotal: any }> {
        const retrieveEmailData = await GmailService.retrieveEmailDetails();
        return {
            emailAddress: retrieveEmailData.emailAddress,
            messagesTotal: retrieveEmailData.messagesTotal
        };
    }
  
    static async getEmailCounts(category: string): Promise<number> {
        return await GmailService.retrieveEmailCounts(category);
    }
  
}