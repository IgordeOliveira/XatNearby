import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
    
    public async login({ auth,request }: HttpContextContract) {
        const email = request.input('email')
        const name = request.input('name')

        const user = await User.firstOrCreate({
            email: email
          },{
            email,
            name
          }
        )
          
        // Generate token
        const token = await auth.use('api').generate(user)
        return token.toJSON()
    }
}
