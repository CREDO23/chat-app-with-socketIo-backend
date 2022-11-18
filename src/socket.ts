import {Server , Socket} from 'socket.io'

export class SocketInit {

    private static instance : SocketInit

    socketIo : Server

    constructor(io : Server) {
        this.socketIo = io 
        this.socketIo.on('connection', (socket : Socket) => {
            console.log(socket)
        })
        SocketInit.instance = this
    }

    


}