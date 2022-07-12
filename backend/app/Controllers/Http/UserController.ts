import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'
import haversine from 'haversine-distance'

export default class UserController {

    public async updateMyselfAndGetNearUsers({ request, auth, response }: HttpContextContract) {

        const payload = await request.validate(UpdateUserValidator)
        const myLat: number = payload.lat
        const myLon: number = payload.lon
       
        const authUser = auth.user;

        if(!authUser) {
            return response.status(404).json({
                status: 'failed',
                message: 'user not found'
            })
        }

        authUser.latitude = myLat
        authUser.longitude = myLat
        authUser.lastLocation =[myLat.toString(), myLon.toString()]
        
        authUser.save()

        const users = await (await User.query().limit(11).orderByRaw("last_location <-> point (?, ?)", [myLon, myLat]))
        //                              remove my user from the list
        const usersJSON = users.filter(user => user.id !== authUser.id).map((user) => { 
            let distance = haversine({lat: user.latitude, lon: user.longitude}, {lat: myLat, lon: myLon})
            distance = distance / 1000
            return {...user.serialize(), distance: `${distance.toFixed(1)} km`}
        })
        return usersJSON
    }
}
