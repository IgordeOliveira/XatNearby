import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Chat from './Chat'

export default class Participant extends BaseModel {

  @column({ isPrimary: true })
  public userId: number

  @column({ isPrimary: true })
  public chatId: number

  @hasOne(() => User, {
    localKey: 'userId',
    foreignKey: 'id'
  })
  public user: HasOne<typeof User>

  @hasOne(() => Chat)
  public chat: HasOne<typeof Chat>
}
