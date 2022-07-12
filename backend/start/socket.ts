import MessageController from 'App/Controllers/Ws/MessageController'
import Ws from 'App/Services/Ws'
import Chat from 'App/Models/Chat'

Ws.boot()

/**
 * Listen for incoming socket connections
 */

Ws.io.use(async (socket, next) => {
  const chatId = socket.handshake.auth.chatId;
  const senderUserId = socket.handshake.auth.senderUserId;

  const chat = await Chat.findBy('uuid', chatId)
  if(!chat) {
    return next(new Error("unauthorized chat"));
  }

  if(socket.connected){
    console.log('already connected')
  }

  socket.data.chat = chat;
  socket.data.senderUserId = senderUserId;
  next();
});

Ws.io.on('connection', async (socket) => {
  const chat = socket.data.chat
  const senderUserId = socket.data.senderUserId
  await socket.join(chat.uuid)
  const messageController = new MessageController(chat, senderUserId)

  //routes
  socket.on('new:message', (message) => messageController.saveMessage(message));
  })