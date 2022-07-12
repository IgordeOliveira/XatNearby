import Chat from "App/Models/Chat"
import Message from "App/Models/Message"
import Ws from "App/Services/Ws"

export default class MessageController {
  private chat
  private senderUserId
  constructor(chat: Chat, senderUserId: number){
    this.chat = chat
    this.senderUserId = senderUserId
    console.log('senderUserId', senderUserId)
    console.log('connected socket', chat.uuid)
  }

  public async saveMessage(messageText){
    console.log('msg salva', messageText)
    console.log('emitindo pro chatid' + this.chat.uuid)
    try{
      await Message.create({
        chatId: this.chat.id,
        content: messageText,
        userId: this.senderUserId
      })
      Ws.io.to(this.chat.uuid).emit("new:message", {content: messageText, senderId: this.senderUserId })
    }catch(err) { console.log(err)}
    
  }
}
