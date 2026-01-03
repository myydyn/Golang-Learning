class NoticationService {
    private dbStorage: MsgStorage = new MsgStorage();

    constructor(readonly type: 'sms' | 'email') { }
    
    sendMessage(msg: string): void {
        if (this.type === 'sms') {
            // complex code to send sms
            // import sms gateway library, config then send sms
            console.log('sent with sms: ', msg);
        } else {
            // complex code to send email
            // import email gateway library, config then send email
            console.log('sent with email: ', msg);
            
        }

        // save msg to db
        this.dbStorage.save(msg);
    }
}


class MsgStorage {
    save(msg: string): string {
        return 'ok';
    }
}



