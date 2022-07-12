import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Chat from 'App/Models/Chat'
import Participant from 'App/Models/Participant';
import User from 'App/Models/User';
import Ws from 'App/Services/Ws'
import { v4 as uuidv4 } from 'uuid';

export default class ChatController {

  public async findOrCreate({ auth, request }: HttpContextContract) {
    const receiverUserId: number = request.input('toUserId')
    const senderUserId = auth.user!.id


    // get the chat thats contains sender e receiver users as participant
    let chat = await Chat.query().where(
      'id',
      Participant.query()
        .select('chat_id')
        .where('user_id', receiverUserId)
        .orWhere('user_id', senderUserId)
        .groupBy('chat_id')
        .havingRaw("count('chat_id') > 1")
    ).first()

    // else, create a new chat uuid and add participantes to them
    if (!chat) {
      const trx = await Database.transaction()
      try {

        chat = await Chat.create({ uuid: uuidv4() }, { client: trx })

        await Participant.createMany([
          { userId: receiverUserId, chatId: chat.id },
          { userId: senderUserId, chatId: chat.id }
        ], { client: trx })

        await trx.commit()
      } catch (error) {
        await trx.rollback()
        throw new Error(error)
      }
    }

    // await chat.load('messages')

    // const lastMessages = chat.messages.map(function(msgBag) {
    //   return {...msgBag.serializeAttributes(), isFromMe: msgBag.userId === fromId}
    // })

    const lastMessages = []

    // Ws.io.emit('new:chat', { id: chat.chatId })
    const receiverUser = await User.findByOrFail('id', receiverUserId)

    return {
      uuid: chat.uuid,
      receiverUser,
      senderUserId,
      lastMessages
    }
  }

}
