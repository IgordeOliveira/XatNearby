import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Message from './Message'

export default class Chat extends BaseModel {
  @column({ isPrimary: true })
  id: number

  @column()
  public uuid: string

  @hasMany(() => Message)
  public messages: HasMany<typeof Message>
}
