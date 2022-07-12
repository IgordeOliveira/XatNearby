import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UpdateUserValidator from 'App/Validators/UpdateUserValidator'
import haversine from 'haversine'

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

        authUser.latitude = this.toFixedNumber(myLat, 4)
        authUser.longitude = this.toFixedNumber(myLon, 4)
        authUser.lastLocation =[this.toFixedNumber(myLat, 4).toString(), this.toFixedNumber(myLon, 4).toString()]
        
        authUser.save()

        const users = await (await User.query().limit(11).orderByRaw("last_location <-> point (?, ?)", [myLon, myLat]))
        //                              remove my user from the list
        const usersJSON = users.filter(user => user.id !== authUser.id).map((user) => { 


            let distance = haversine({latitude: user.latitude, longitude: user.longitude}, {latitude: myLat, longitude: myLon})
            return {...user.serialize(), distance: `${distance.toFixed(1)} km`}
        })
        return usersJSON
    }

    private toFixedNumber(num, digits, base?){
        var pow = Math.pow(base||10, digits);
        return Math.round(num*pow) / pow;
      }
      
      
}
