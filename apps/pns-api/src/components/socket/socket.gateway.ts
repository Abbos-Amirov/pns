import { Logger } from '@nestjs/common';
import {
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'ws';
import * as WebSocket from 'ws';
import { AuthService } from '../auth/auth.service';
import { Member } from '../../libs/dto/member/member';
import { Message } from '../../libs/enums/common.enum';
import * as url from 'url';

interface MessagePayload {
  event: string;
  text: string;
  memberData: ClientUser;
}

interface InfoPayload {
  event: string;
  totalClients: number;
  memberData: ClientUser;
  action: string;
}

@WebSocketGateway({ transports: ['websocket'], secure: false })
export class SocketGateway implements OnGatewayInit {
  private logger: Logger = new Logger('SocketEventsGateway');
  private summaryClient = 0;
  private clientsAuthMap = new Map<WebSocket, ClientUser>();
  private messagesList: MessagePayload[] = [];
  constructor( private authService: AuthService){}

  @WebSocketServer()
  server: Server;

  /** WebSocket server ishga tushganda */
  public afterInit(server: Server) {
    this.logger.verbose(
      `WebSocked Server Initialized & total [${this.summaryClient}]`,
    );
  }

  private async retrieveAuth (req: any): Promise<Member | null> {
    try{
      const parseUrl = url.parse(req.url,true);
      const {token} = parseUrl.query;
     
      return await this.authService.verifyToken(token as string)

    } catch(err) {
      return  null;

    }
  }

  /** Mijoz ulangan payt */
  public async handleConnection(client: WebSocket, req: any) {
    const authMember = await this.retrieveAuth(req);
  
    // Guest mode (token bo'lmasa ham ulansin)
    const clientUser: ClientUser = authMember
      ? authMember
      : { memberNick: 'Guest', memberType: 'GUEST' };
  
    this.clientsAuthMap.set(client, clientUser);
  
    this.summaryClient++;
    const clientNick = clientUser.memberNick ?? 'Guest';
    this.logger.verbose( `Connection [${clientNick}] & total [${this.summaryClient}]`);
  
    const infoMsg: InfoPayload = {
      event: 'info',
      totalClients: this.summaryClient,
      // agar InfoPayload'ga Member majburiy bo'lsa, u holda tipni ham ClientUser ga o'zgartiring
      memberData: clientUser as any, 
      action: 'joined',
    };
    this.emitMessage(infoMsg);
    client.send(JSON.stringify({event: 'getMessages', list: this.messagesList}))
  }

  /** Mijoz uzilganda */
  public  handleDisconnect(client: WebSocket) {
    const authMember = this.clientsAuthMap.get(client)
    if(!authMember) throw Error(Message.DISCONNECT_FAILED)
    this.summaryClient--;
    this.clientsAuthMap.delete(client)
    const clientNick: string = authMember?.memberNick ?? 'Guest'

    this.logger.verbose(
          `Disconnection [${clientNick}] | total [${this.summaryClient}]`,
       );
  
    
    const infoMsg: InfoPayload = {
      event: 'info',
      totalClients: this.summaryClient,
      memberData: authMember,
      action: 'left'
    
      
    };
    this.broadcastMessage(client, infoMsg);
  }

  /** Xabar yuborish */
  @SubscribeMessage('message')
  public async handleMessage(client: WebSocket, payload: string): Promise<void> {
    const authMember = this.clientsAuthMap.get(client)
    if(!authMember) throw Error(Message.DISCONNECT_FAILED)
    const newMessage: MessagePayload = { event: 'message', text: payload, memberData: authMember };
    const clientNick: string = authMember?.memberNick ?? 'Guest'

    this.logger.verbose(`NEW MESSAGE [${clientNick}] ${payload}`);

    this.messagesList.push(newMessage)
    if(this.messagesList.length > 12) this.messagesList.splice(0,this.messagesList.length - 12)
    this.emitMessage(newMessage);
  }

  private broadcastMessage(sender: WebSocket, message: InfoPayload | MessagePayload) {
    this.server.clients.forEach((client) => {
      if (client !== sender && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  }

  private emitMessage(message: InfoPayload | MessagePayload) {
    this.server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(message));
      }
    });
  }
}

// WS uchun minimal guest tipi
type Guest = {
  memberNick: string;
  memberType: 'GUEST';
};

// Har bir client uchun saqlanadigan foydalanuvchi turi
type ClientUser = Member | Guest;