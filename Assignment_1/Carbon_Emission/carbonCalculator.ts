import { EmailCarbonFootprint } from './interfaces/emailCarbonFootprint';

export class EmailCarbonCalculator {
    static getCarbonFootprint(entityType: string, entity: EmailCarbonFootprint): EmailCarbonFootprint | string {
        if (entityType === 'email') {
            const email = entity.emailId;
            const source = this.getServiceProvider(entity.emailId!);
            const inboxSize = this.estimateEmailInboxSize(entity.inbox);
            const sentSize = this.estimateSentEmailSize(entity.sent);
            const spamSize = this.estimateSpamEmailSize(entity.spam);
    
            return {
                emailId: email,
                source:source,
                totalEmail : entity.totalEmail,
                inbox: inboxSize,
                sent: sentSize,
                spam: spamSize
            };
        } else {
            return "Unsupported entity type";
        }
    }
    
    static getServiceProvider(email: string): string {
        const atIndex = email.lastIndexOf('@');
    
        if (atIndex !== -1) {
            return email.slice(atIndex + 1);
        } else {
            return 'Invalid email format';
        }
    }
    
    static estimateEmailInboxSize(inboxSize: number): number {
        return (inboxSize * 4)/1000;
    }
    
    static estimateSentEmailSize(sentEmail: number): number {
        return (sentEmail * 0.3)/1000;
    }
    
    static estimateSpamEmailSize(spamEmail: number): number {
        return (spamEmail * 0.3)/1000;
    }
}
