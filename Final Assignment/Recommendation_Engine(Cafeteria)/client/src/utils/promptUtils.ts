import * as readline from 'readline';
import { Socket } from 'socket.io-client';

export class CredentialPrompter {
    constructor(private socket: Socket, private rl: readline.Interface) {}

    public promptCredentials(): void {
        this.rl.question('Enter your email: ', (email) => {
            this.rl.question('Enter your password: ', (password) => {
                this.socket.emit('authenticate', email, password);
            });
        });
    }
}
