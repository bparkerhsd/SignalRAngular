import { Component, OnInit } from '@angular/core';
import { HubConnection } from '@aspnet/signalr-client';

@Component({
    selector: 'signalr',
    templateUrl: './signalr.component.html'
})
export class SignalRComponent implements OnInit {
    public currentCount = 0;
    private _hubConnection: HubConnection;
    messages: string[] = [];
    message = '';
    connectionStatus: string;
    connectionString: string = 'https://xxxxxxxxxxxxxxxx.azurewebsites.net/chat';

    public sendMessage(): void {
        const data = `Sent: ${this.message}`;

        this._hubConnection.invoke('Send', data);
        this.messages.push(data);
    }

    ngOnInit() {
        this.connectionStatus = "Not connected.";

        
    }

    public connect() {
        
        try {
            this._hubConnection = new HubConnection(this.connectionString);
            this._hubConnection.on('Send', (data: any) => {
                const received = `Received: ${data}`;
                this.messages.push(received);
                console.log(received);
            });

            this._hubConnection.start()
                .then(() => {
                    console.log('Hub connection started')
                    this.connectionStatus = "Connected.";
                })
                .catch(err => {
                    console.log('Error while establishing connection')
                    this.connectionStatus = `Error while establishing connection: ${err}`;
                });
        }
        catch (ex) {
            console.log(`Exception connecting: ${ex}`);
        }
    }

    public disconnect() {
        this._hubConnection.stop();
        this.connectionStatus = "Not connected.";   
    }
}

