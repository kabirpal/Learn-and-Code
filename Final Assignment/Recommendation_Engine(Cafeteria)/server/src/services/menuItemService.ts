import { RowDataPacket } from 'mysql2/promise';
import MySQLConnection from '../database/mySQLConnection';

export class MenuItemService {
    private dbConnection: MySQLConnection;

    constructor(dbConnection: MySQLConnection) {
        this.dbConnection = dbConnection;
    }

    public async addMenuItem(menuItem: any): Promise<void> {
        const connection = this.dbConnection.getConnection();
        if (connection) {
            await connection.execute('INSERT INTO menuItem (ItemName, category, rating) VALUES (?, ?, ?)', [menuItem.name, menuItem.category, menuItem.rating]);
        } else {
            throw new Error('No database connection.');
        }
    }

    public async updateMenuItem(menuItem: any): Promise<void> {
        const connection = this.dbConnection.getConnection();
        if (connection) {
            await connection.execute('UPDATE menuItem SET ItemName = ?, category = ?, rating = ? WHERE ItemId = ?', [menuItem.name, menuItem.category, menuItem.rating, menuItem.id]);
        } else {
            throw new Error('No database connection.');
        }
    }

    public async getAllMenuItems(): Promise<RowDataPacket[]> {
        const connection = this.dbConnection.getConnection();
        if (connection) {
            const [rows] = await connection.execute<RowDataPacket[]>('SELECT * FROM MenuItem');
            return rows;
        } else {
            throw new Error('No database connection.');
        }
    }

    public async deleteMenuItem(menuItemId: number): Promise<void> {
        const connection = this.dbConnection.getConnection();
        if (connection) {
            await connection.execute('DELETE FROM menuItem WHERE ItemId = ?', [menuItemId]);
        } else {
            throw new Error('No database connection.');
        }
    }
}
