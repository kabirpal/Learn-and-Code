import { Request, Response } from 'express';
import UserRepository from './userRepository';
import * as bcrypt from 'bcryptjs'
import { User } from '../interfaces/users';

export class userLoginController {

    constructor() {
        this.login = this.login.bind(this);
        this.handleInvalidUser = this.handleInvalidUser.bind(this);
        this.isPasswordValid = this.isPasswordValid.bind(this);
        this.handleInvalidPassword = this.handleInvalidPassword.bind(this);
        this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
        this.handleInternalServerError = this.handleInternalServerError.bind(this);
    }

    
    public async login(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;
        const userRepository = new UserRepository();
        const user = await userRepository.loginUser(email);
        
        try {
            if (!user) {
                this.handleInvalidUser(res);
                return;
            }
    
            if (!await this.isPasswordValid(password, user.password)) {
                this.handleInvalidPassword(res);
                return;
            }
    
            this.handleSuccessfulLogin(res, user);
        } catch (error:any) {
            this.handleInternalServerError(res, error.message);
        }
    }
    
    private handleInvalidUser = (res: Response): void => {
        res.status(401).json({ message: "Invalid email or password" });
    }
    
    private isPasswordValid = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
        return await bcrypt.compare(plainPassword, hashedPassword);
    }
    
    private handleInvalidPassword = (res: Response): void => {
        res.status(401).json({ message: "Invalid email or password" });
    }
    
    private handleSuccessfulLogin = (res: Response, user: User): void => {
        res.json({ message: "Login successful", user });
    }
    
    private handleInternalServerError = (res: Response, errorMessage: string): void => {
        res.status(500).json({ message: errorMessage });
    }
    
}
