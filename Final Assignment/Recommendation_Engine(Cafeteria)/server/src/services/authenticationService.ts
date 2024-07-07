import { RowDataPacket } from 'mysql2';
import MySQLConnection from '../database/mySQLConnection';

export class AuthenticationService {
    private dbConnection: MySQLConnection;

    constructor(dbConnection: MySQLConnection) {
        this.dbConnection = dbConnection;
    }

    public async authenticateUser(email: string, password: string): Promise<{ role: string | null, message: string, userId : number }> {
        const connection = this.dbConnection.getConnection();
        if (connection) {
            try {
                const [rows] = await connection.execute<RowDataPacket[]>('SELECT roleId, userId FROM user WHERE email = ? AND password = ?', [email, password]);
                if (Array.isArray(rows) && rows.length > 0) {
                    const [roleName] = await connection.execute<RowDataPacket[]>('SELECT role FROM role WHERE roleId = ?', [rows[0].roleId]);
                    const userRole = roleName[0].role;
                    return { role: userRole, message: `User authenticated as: ${userRole}`, userId : rows[0].userId };
                } else {
                    return { role: null, message: 'Authentication failed: Invalid email or password.', userId: 0 };
                }
            } catch (error) {
                console.error('Database query error:', error);
                return { role: null, message: 'Authentication failed: Database error.', userId: 0 };
            }
        } else {
            return { role: null, message: 'Authentication failed: No database connection.', userId: 0 };
        }
    }
}
