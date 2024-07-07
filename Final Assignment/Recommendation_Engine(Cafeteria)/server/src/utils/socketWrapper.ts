import { Server, Socket } from 'socket.io';

class SocketWrapper {
    private port: number;
    private io: Server;

    constructor(port: number) {
        this.port = port;
        this.io = new Server();
    }

    public start(): void {
        this.io.listen(this.port);
        console.log(`Socket.io server running on port ${this.port}`);
    }

    public onConnection(callback: (socket: Socket) => void): void {
        this.io.on('connection', callback);
    }
}

export default SocketWrapper;
