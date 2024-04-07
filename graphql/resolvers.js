const UserSchema = require('../models/User')
const MessageSchema = require('../models/Mensajes')
const HouseSchema = require('../models/House')

const resolvers ={

    hello: () =>{
        return "Hola Mundo!"
    },
    User: async (_,{id}) =>{
        try{
            return user = await UserSchema.findById(id);
        }catch(e){
            console.log()
        }
    },
    Users: async () =>{
        try{
            return await UserSchema.find();

        }
        catch(e){
            console.log()
        }
    },

    UsersByFilter: async (_, {filter}) =>{
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
            const users = await UserSchema.find(query)
        }
        catch(e){
            console.log("Error obteniendo el usuario: ")
    
    }
},

    Message: async (_,{id})=>{
        try{
            return message = await MessageSchema.findById(id).populate({

                path:'from',
                select:'-password'        })
                .populate({
                    path:'to',
                    select:'-password'});
            }catch(e){
                console.log(e)
                            }
    },
    Messages: async () =>{
        try{
            return await MessageSchema.find().populate({
                path:'from',
                select:'-password'})
                .populate({
                    path:'to',
                    select:'-password'});
                }
                catch(e){
                    console.log(e)
                }
            },
    MessageByFilter: async (_,{filter}) =>{
        try{
            let query = {};
            if(filter){
                if(filter.from){
                    querry ={from:filter.from}
                }
                if(filter.to){
                    query = {to:filter.to}
                }
                if(filter.body){
                    query.body = {$regex: filter.body,$options:'i'}
                }
                const message = await MessageSchema.find(query).populate('from')
                                              .getPopulatedPaths('to')
                return message;
            }
        }catch(e){
            console.log("Error obteniendo el mensaje")
    }
},

    House: async (_,{id})=>{
        try{
            return house = await HouseSchema.findById(id)     
        }catch(e)
        {console.log("Error obteniendo la Casa")
    }
},

  Houses: async () =>{
    try{
        return await HouseSchema.find()
    }catch(e){
        console.log("Error obteniendo las Casas")
    }
  }

  

}
module.exports = resolvers