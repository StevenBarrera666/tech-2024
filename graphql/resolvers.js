const Userschema = require('../models/User')

const resolvers ={

    hello: () =>{
        return "Hola Mundo!"
    },
    User: async () =>{
        try{
            return user = Userschema
        }catch(e){
            console.log()
        }
    },
    Users: async () =>{
        try{
            return await Userschema.findOne();

        }
        catch(e){
            console.log()
        }
    },

    usersByFilter: async () =>{
        try{
            let query = {};

            if(filter){
                if(filter.name)
                 query.name = {$regex: filter.name, $options: 'i'}
            }
            if(filter){
                if(filter.email)
                 query.email = {$regex: filter.email, $options: 'i'}
            }
            if(filter){
                if(filter.lastname)
                 query.lastname = {$regex: filter.lastname, $options: 'i'}
            }
            const users = await Userschema.find(query)
        }
        catch(e){
            console.log("Error obteniendo el usuario: ")
    
    }

}
}

module.exports = resolvers