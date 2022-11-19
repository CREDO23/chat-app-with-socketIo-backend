import {Server , Socket} from 'socket.io'


export default class SocketInit {

    private static instance : SocketInit

    socket : Server

    sessions : Map<string,string> = new Map()

    constructor(io : Server) {
        this.socket = io 
        this.socket.on('connection', (socket : Socket) => {
            this.sessions.set(socket.handshake.auth.userId , socket.id) 
            socket.handshake.auth.chats.forEach(chat => socket.join(chat))
            socket.on('disconnect' , () =>[
                console.log('A user disconnected' )
            ])
        })
        SocketInit.instance = this
    }


    public static getInstance(){
        return SocketInit.instance
    }

    public  newChat(chatName : string , chat){
        this.socket.to(chatName).emit('newChat' , chat)
    }

}