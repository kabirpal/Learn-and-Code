import { google, gmail_v1 } from 'googleapis';
import { EmailDetails } from '../interfaces/EmailDetails';

const gmail: gmail_v1.Gmail = google.gmail('v1');

export class GmailService {  
    static async retrieveEmailDetails(): Promise<EmailDetails> {
        const profileResponse = await gmail.users.getProfile({
            userId: 'me',
        });
    
        const emailData: EmailDetails = {
            emailAddress: profileResponse.data.emailAddress!,
            messagesTotal: profileResponse.data.messagesTotal!,
        };
        return emailData;
    }
    
    
    static async retrieveEmailCounts(labelName: string): Promise<number> {
        const response = await gmail.users.labels.get({
            userId: 'me',
            id: labelName,
        });
        return response.data.messagesTotal || 0;
    }
}