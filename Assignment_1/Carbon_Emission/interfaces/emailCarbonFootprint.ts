export interface EmailCarbonFootprint {
    emailId?: string;
    source?: string;
    inbox: number;
    sent: number;
    spam: number;
    totalEmail : number;
}