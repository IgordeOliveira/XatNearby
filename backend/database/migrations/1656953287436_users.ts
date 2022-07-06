import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name')
      table.string('email', 255).notNullable()
      table.string('desc').nullable()
      table.integer('age').nullable()
      table.double('latitude').nullable()
      table.double('longitude').nullable()
      table.point('last_location').nullable()
      table.index('last_location','location', 'GIST')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
