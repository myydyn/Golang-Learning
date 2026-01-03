import { type INotifier, type IMsgStorage } from "./interfaces/index.js";
import { SMSNotification, EmailNotification, MySQLMsgStorage } from "./repository/index.js";


class NoticationDIPService {
    // dependency injection by constructor
    constructor(
        private  notifier: INotifier,
        private readonly dbStorage: IMsgStorage,
    ) { }
    
    // depencency injection by setter
    setNotifier(n: INotifier) {
        this.notifier = n;
    }


    sendMessage(msg: string): void {
        this.notifier.send(msg);    

        // save msg to db
        this.dbStorage.save(msg);
    }
}


// setup dependency

const smsNotifier = new SMSNotification();
const smsStorage = new MySQLMsgStorage();
const service = new NoticationDIPService(smsNotifier, smsStorage);

// run your business
service.sendMessage('hello');

// change notifier
service.setNotifier(new EmailNotification());
service.sendMessage('hello');   

