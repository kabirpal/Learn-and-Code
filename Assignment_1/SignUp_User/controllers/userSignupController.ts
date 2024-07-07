import { Request, Response } from 'express';
import { DirectoryService } from '../services/directoryService';
import { User } from '../interfaces/users'; 
import UserRepository from '../controllers/userRepository';
import * as bcrypt from 'bcryptjs';

export class userSignupController {
    
    public async signUp(req: Request, res: Response): Promise<void>  {
        const { name, age, email, phone, gender, password } = req.body;
        try{
            const encryptedPassword = await bcrypt.hash(password,10)
            const data: User = { name, age, email, phone, gender, password:encryptedPassword }; 
            const directoryService = new DirectoryService();
            const userRepository = new UserRepository();
    
            userRepository.insertUser(data)
                .then(() => {
                    directoryService.createDirectory(email);
                    res.redirect('signup_successful.html');
                })
                .catch((err: Error) => {
                    console.error("Error inserting user:", err);
                    res.status(500).send("Error signing up");
                });
            
        }catch(error){
            console.error("Error hashing password:", error);
            res.status(500).send("Error signing up");
        }
    }

}
