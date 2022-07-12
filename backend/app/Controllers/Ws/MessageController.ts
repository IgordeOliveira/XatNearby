import Chat from "App/Models/Chat"
import Ws from "App/Services/Ws"

export default class MessageController {
  private chatId
  private senderUserId
  constructor(chat: Chat, senderUserId: number){
    this.chatId = chat.uuid
    this.senderUserId = senderUserId
    console.log('senderUserId', senderUserId)
    console.log('connected socket', chat.uuid)
  }

  public saveMessage(messageText){
    console.log('msg salva', messageText)
    console.log('emitindo pro chatid' + this.chatId)
    Ws.io.to(this.chatId).emit("new:message", {content: messageText, senderId: this.senderUserId })
  }
}
