import { createConnection, Connection } from 'mysql2/promise';

class MySQLConnection {
    private connection: Connection | null = null;

    public async connect(): Promise<void> {
        this.connection = await createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Intime',
            database: 'recommendationengine'
        });

        console.log('Connected to MySQL database');
    }

    public getConnection(): Connection | null {
        return this.connection;
    }

    public async disconnect(): Promise<void> {
        if (this.connection) {
            await this.connection.end();
            console.log('Disconnected from MySQL database');
        }
    }
}

export default MySQLConnection;
