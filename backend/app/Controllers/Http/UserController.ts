import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'
import haversine from 'haversine-distance'

export default class UserController {

    public async updateMyselfAndGetNearUsers({ request }: HttpContextContract) {

        const payload = await request.validate(UpdateUserValidator)
        const myLat: number = payload.lat
        const myLon: number = payload.lon
        const users = await (await User.query().limit(5).orderByRaw("last_location <-> point (?, ?)", [myLon, myLat]))
        const usersJSON = users.map((user) => { 
            const distance = haversine({lat: user.latitude, lon: user.longitude}, {lat: myLat, lon: myLon}).toFixed()
            return {...user.serialize(), distance: `${distance} meters`}
        })
        return usersJSON
    }
}
