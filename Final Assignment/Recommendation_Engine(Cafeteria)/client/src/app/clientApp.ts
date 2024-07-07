import * as readline from 'readline';
import { io, Socket } from 'socket.io-client';
import AdminMenuService from '../services/adminService';
import ChefMenuService from '../services/chefService';
import EmployeeMenuService from '../services/employeeService';
import { SocketManager } from '../utils/socketManager';

export class ClientApp {
    private socket: Socket;
    private rl: readline.Interface;
    private adminMenuService: AdminMenuService;
    private chefMenuService: ChefMenuService;
    private socketManager: SocketManager;
    private employeeMenuService: EmployeeMenuService;

    constructor(private port: number) {
        this.socket = io(`http://localhost:${this.port}`);
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        this.adminMenuService = new AdminMenuService(this.rl, this.socket);
        this.chefMenuService = new ChefMenuService(this.rl, this.socket);
        this.employeeMenuService = new EmployeeMenuService(this.rl, this.socket);
        this.socketManager = new SocketManager(this.socket, this.rl, this.adminMenuService, this.chefMenuService, this.employeeMenuService);
        this.socketManager.setupSocketEvents();
    }

    public start() {
        this.socket.connect();
    }
}
