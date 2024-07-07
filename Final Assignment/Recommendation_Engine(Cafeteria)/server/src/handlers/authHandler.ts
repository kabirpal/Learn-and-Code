import { Socket } from 'socket.io';
import { AuthenticationService } from '../services/authenticationService';
import MySQLConnection from '../database/mySQLConnection';

class AuthenticationHandler {
    private authenticationService: AuthenticationService;

    constructor(dbConnection: MySQLConnection) {
        this.authenticationService = new AuthenticationService(dbConnection);
    }

    public handleAuthentication(socket: Socket): void {
        socket.on('authenticate', async (email: string, password: string) => {
            console.log(`Authentication request from ${email}`);
            const result = await this.authenticationService.authenticateUser(email, password);
            console.log(result);
            socket.emit('authResult', { message: result.message, role: result.role, userId: result.userId });
        });
    }
}

export default AuthenticationHandler;
