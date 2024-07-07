import Server from './services/localServerService';
import DatabaseConnector from './services/databaseConnector';

const databaseConnector = new DatabaseConnector();
const server = new Server(databaseConnector);
server.start();
