import { RowDataPacket } from 'mysql2/promise';
import MySQLConnection from '../database/mySQLConnection';

export class FeedbackService {
    private dbConnection: MySQLConnection;

    constructor(dbConnection: MySQLConnection) {
        this.dbConnection = dbConnection;
    }

    public async getAllFeedback(): Promise<RowDataPacket[]> {
        const connection = this.dbConnection.getConnection();
        if (connection) {
            const query = 'SELECT f.*, m.ItemName FROM feedback f JOIN menuItem m ON f.itemId = m.itemId';
            const [rows] = await connection.execute<RowDataPacket[]>(query);
            return rows;
        } else {
            throw new Error('No database connection.');
        }
    }

    public async getFeedbackByCategory(category: string): Promise<RowDataPacket[]> {
        const connection = this.dbConnection.getConnection();
        if (connection) {
            const query = 'SELECT f.itemId, m.ItemName AS foodItem, f.comment, f.rating FROM feedback f JOIN menuItem m ON f.itemId = m.itemId WHERE m.category = ?';
            const [rows] = await connection.execute<RowDataPacket[]>(query, [category]);
            return rows;
        } else {
            throw new Error('No database connection.');
        }
    }

    public async insertUserFeedback(feedback: any) {
        const connection = this.dbConnection.getConnection();
        if(connection) {
            const query = `INSERT INTO feedback (userId, itemId, rating, comment, date) VALUES
                            (?, ?, ?, ?, Now())`;
            await connection.execute(query,[feedback.userId, feedback.itemId, feedback.rating, feedback.comment]);
            return 'Data inserted'
        } else {
            throw new Error('No database connection.')
        }
    }

    public async viewEmployeeVotes(item:any){
        console.log(item.category);
        const connection = this.dbConnection.getConnection();
        if(connection){
            const checkQuery = `
                SELECT * FROM recommendedItem 
                WHERE category = ? AND DATE(rolloutDate) = CURDATE()
            `;
            const [rows] = await connection!.execute(checkQuery, [item.category]);
            console.log(rows);
            return rows;
        }
    }
}
