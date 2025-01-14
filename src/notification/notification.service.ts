import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';



@Injectable()
export class NotificationService {
    private transporter;

    constructor(){
        this.transporter= nodemailer.createTransport({
            service:'gmail',

            auth:{
                user:'zarilasam99@gmail.com',
                pass:'17381999'
            },
        });
    }
    async sendEmail(to:string, subject:string, text:string){
        const mailOptions={
            from:'zarilasam99@gmail.com',
            to,
            subject,
            text,
        };

        await this.transporter.sendEmail(mailOptions);

    }
}
