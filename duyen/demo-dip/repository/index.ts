import type { INotifier, IMsgStorage } from "../interfaces";


export class SMSNotification implements INotifier {
    send(msg: string): void {
        console.log('send sms: ', msg);
    }   
}


export class EmailNotification implements INotifier {
    send(msg: string): void {
        console.log('send email: ', msg);
    }   
}   


export class MySQLMsgStorage implements IMsgStorage{
    save(msg: string): string {
        console.log('save to mysql: ', msg);
        return 'ok';
    }
}
