import { EmailCarbonFootprint } from './interfaces/emailCarbonFootprint';
import { EmailCarbonCalculator } from './carbonCalculator';
import { UserAuthentication } from './Services/userAuthentication';

UserAuthentication.authenticateByEmail().then(response=>{
    console.table(response)
    const emailDetails: EmailCarbonFootprint = { 
        emailId: response.email,
        inbox: response.inboxEmails, 
        sent: response.sentEmails, 
        spam: response.spamEmails,
        totalEmail: response.totalEmails };
    const entityType = 'email';
    const emailFootprint = EmailCarbonCalculator.getCarbonFootprint(entityType, emailDetails);
    console.log(emailFootprint);
}).catch(error=>{
    console.log(error);
})
  
  