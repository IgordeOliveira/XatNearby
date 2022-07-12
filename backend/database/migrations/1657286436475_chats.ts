import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'chats'

  public async up () {
    await this.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.uuid('uuid').unique()
    })
  }

  public async down () {
    this.schema.raw('DROP EXTENSION IF EXISTS "uuid-ossp"')
    this.schema.dropTable(this.tableName)
  }
}
