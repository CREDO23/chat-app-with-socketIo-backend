import {Server , Socket} from 'socket.io'
import chat from './models/chat'


export default class SocketInit {

    private static instance : SocketInit

    socket : Socket

    io : Server

    sessions : Map<string,string> = new Map()

    constructor(io : Server) {
        this.io = io 
        this.io.on('connection', async (socket : Socket) => {
            this.socket = socket

          const rooms = await chat.find({ users: { $in: [`${socket.handshake.auth.userId}`] } }).select({
            name : 1,
            _id : 0
          })

          console.log(socket)

          rooms.forEach(room => socket.join(room.name))
            console.log(io.engine.clientsCount);
            this.sessions[socket.handshake.auth.userId] =  socket.id
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
        this.socket.broadcast.to(chatName).emit('newChat' , chat)
    }

}