import User from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(User, ({ faker }) => {
  // 
  const coordinates: any = faker.address.nearbyGPSCoordinate([-20.27884864807129,-40.298179626464844], 5, true)
  return {
    name: faker.name.firstName() + ' ' + faker.name.lastName(),
    desc: faker.lorem.words(10),
    age: parseInt(faker.random.numeric(2)),
    latitude: coordinates[0],
    longitude: coordinates[1],
    last_location: coordinates
  }
}).build()
