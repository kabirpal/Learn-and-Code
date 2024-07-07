import mongoose from "mongoose";
import { User } from '../interfaces/users';

class UserRepository {
    private userModel: mongoose.Model<User>;

    constructor() {
        const existingUserModel = mongoose.models.User;
        if (existingUserModel) {
            this.userModel = existingUserModel;
        } else {
            const userSchema: mongoose.Schema<User> = new mongoose.Schema<User>({
                name: String,
                age: Number,
                email: String,
                phone: String,
                gender: String,
                password: String
            });
            this.userModel = mongoose.model<User>("User", userSchema);
        }
    }

    public async insertUser(data: User): Promise<User> {
        const user = await this.findUser(data.email);
        if(user){
            throw new Error(`User with same email already exist`);
        }
        const newUser = await this.userModel.create(data);
        return newUser;
    }

    public async findUser(email: string): Promise<User | null> {
        try {
            const existingUser = await this.userModel.findOne({email});
            return existingUser;
        } catch (error:any) {
            throw new Error(`Error inserting user: ${error.message}`);
        }
    }

    public async loginUser(email: string): Promise<User | null> {
        try {
            const user = await this.userModel.findOne({ email });
            return user;
        } catch (error:any) {
            throw new Error(`Error logging in user: ${error.message}`);
        }
    }
}

export default UserRepository;
