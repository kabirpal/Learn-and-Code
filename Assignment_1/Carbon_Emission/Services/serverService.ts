import * as http from 'http';
import * as url from 'url';
import * as openBrowser from 'opn';
import { oauth2Client } from './userAuthentication'


export class ServerService {
    // eslint-disable-next-line @typescript-eslint/ban-types
    static createLocalServer(authorizeUrl: string, resolve: Function, reject: Function): http.Server {
        const server = http.createServer(async (request, response) => {
            try {
                if (ServerService.isOAuthCallbackURL(request.url)) {
                    await ServerService.handleOAuthCallbackRequest(request, response);
                    resolve(oauth2Client);
                }
            } catch (error) {
                reject(error);
            }
        }).listen(3000, () => {
            openBrowser(authorizeUrl, { wait: false }).then((childProcess: { unref: () => any; }) => childProcess.unref());
        });
        return server;
    }

    static isOAuthCallbackURL(url: string | undefined): boolean {
        return Boolean(url && url.indexOf('/oauth2callback') > -1);
    }
  
    static async handleOAuthCallbackRequest(request: http.IncomingMessage, response: http.ServerResponse): Promise<void> {
        const queryParameters = new url.URL(request.url!, 'http://localhost:3000').searchParams;
        response.end('User authentication successful! Please return to the console.');
        const { tokens } = await oauth2Client.getToken(queryParameters.get('code')!);
        oauth2Client.credentials = tokens;
    }
}