import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'
import haversine from 'haversine-distance'

export default class UserController {

    public async updateMyselfAndGetNearUsers({ request }: HttpContextContract) {
        const payload = await request.validate(UpdateUserValidator)
        const lat: number = payload.lat
        const lon: number = payload.lon
        const users = await (await User.query().limit(5).orderByRaw("last_location <-> point (?, ?)", [lon, lat]))
        const usersJSON = users.map((user) => { 
            const distance = haversine({lat: user.latitude, lon: user.longitude}, {lat, lon}).toFixed()
            return {...user.serialize(), distance: `${distance} meters`}
        })
        return usersJSON
    }
}
