import fs = require('fs');
import path =  require('path');

export class DirectoryService {
    public createDirectory(email: string): void {
        const directoryPath = path.join(__dirname, `../user_directories/${email}`);
        fs.mkdir(directoryPath, { recursive: true }, (err) => {
            if (err) {
                this.handleDirectoryCreationError(err);
            } else {
                console.log('Directory created successfully:', directoryPath);
            }
        });
    }

    private handleDirectoryCreationError(err: NodeJS.ErrnoException): void {
        console.error('Error creating directory:', err);
    }
}
