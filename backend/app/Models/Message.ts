import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Chat from './Chat'
import User from './User'

export default class Message extends BaseModel {
  
  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: null})
  public chatId: number 

  @column()
  public content: string 

  @column({ serializeAs: null})
  public userId: number 

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @hasOne(() => Chat)
  public chat: HasOne<typeof Chat>

  @hasOne(() => User)
  public user: HasOne<typeof User>
}
