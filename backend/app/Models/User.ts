import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Chat from './Chat'
import Participant from './Participant'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column() //description
  public desc: string 

  @column()
  public email: string 

  @column()
  public age: number

  @column()
  public latitude: number

  @column()
  public longitude: number

  @column({
    prepare: (value: [latitude: string, longitude: string]) => `(${value.reverse().join(',')})`,
    serializeAs: null
  })
  public lastLocation: [latitude: string, longitude: string]

  @column.dateTime({ autoCreate: true, serializeAs: null })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serializeAs: null })
  public updatedAt: DateTime

  @hasMany(() => Participant)
  public inChats: HasMany<typeof Participant>

}
