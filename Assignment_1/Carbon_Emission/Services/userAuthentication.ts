/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { google } from 'googleapis';
import { ServerService } from './serverService';
import { EmailService } from './emailService';


const credentials: 
    { 
        web: { 
                client_id: string;
                client_secret: string; 
                redirect_uris: string[] 
            } 
    } = require('../Assets/credentials.json');
export const oauth2Client: any = new google.auth.OAuth2(
    credentials.web.client_id,
    credentials.web.client_secret,
    credentials.web.redirect_uris[0],
);

google.options({ auth: oauth2Client });


export class UserAuthentication {
    static async authenticateByEmail(): Promise<{ email: any; totalEmails: any; sentEmails: number; inboxEmails: number; spamEmails: number; }> {
        const authenticationScopes: string[] = [
            'https://www.googleapis.com/auth/contacts.readonly',
            'https://www.googleapis.com/auth/gmail.readonly',
            'https://www.googleapis.com/auth/user.emails.read',
            'profile',
        ];
  
        try {
            await UserAuthentication.authenticateUser(authenticationScopes);
            const emailDetails = await EmailService.getEmailDetails();
            const sentEmails = await EmailService.getEmailCounts('SENT');
            const inboxEmails = await EmailService.getEmailCounts('INBOX');
            const spamEmails = await EmailService.getEmailCounts('SPAM');
            return {
                email: emailDetails.emailAddress,
                totalEmails: emailDetails.messagesTotal,
                sentEmails: sentEmails,
                inboxEmails: inboxEmails,
                spamEmails: spamEmails
            };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async authenticateUser(authenticationScopes: string[]): Promise<google.auth.OAuth2> {
        return new Promise((resolve, reject) => {
            const authorizeUrl = UserAuthentication.generateAuthUrl(authenticationScopes);
            try {
                ServerService.createLocalServer(authorizeUrl, resolve, reject);
            } catch (error) {
                reject(error);
            }
        });
    }

    static generateAuthUrl(authenticationScopes: string[]): string {
        return oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: authenticationScopes.join(' '),
        });
    }
}






