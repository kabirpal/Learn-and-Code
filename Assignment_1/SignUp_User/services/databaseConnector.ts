import mongoose from "mongoose";

interface DatabaseConnection {
    initializeConnection(): void;
}

class MongoDBConnection implements DatabaseConnection {
    async initializeConnection(): Promise<void> {
        console.log("MongoDBConnection Called");

        try {
            await mongoose.connect('mongodb://0.0.0.0:27017/Database', { useUnifiedTopology: true } as mongoose.ConnectOptions);
            console.log("Connected to MongoDB");
        } catch (err) {
            console.error("Error connecting to MongoDB:", err);
            process.exit(1);
        }
    }
}

class MySQLConnection implements DatabaseConnection {
    initializeConnection(): void {
        // Add MySQL connection logic here
        console.log("Connecting to MySQL");
        // Execute MySQL connection is established
    }
}
class DatabaseConnector {
    async connectToDatabase(): Promise<DatabaseConnection> {
        const databaseType = 'mongodb'; 
        if (databaseType === "mongodb") {
            const mongoDBConnection :DatabaseConnection = new MongoDBConnection();
            await mongoDBConnection.initializeConnection();
            return mongoDBConnection;
        } else if (databaseType === "mysql") {
            return new MySQLConnection();
        } else {
            throw new Error("Invalid database type specified");
        }
    }
}

export default DatabaseConnector;
