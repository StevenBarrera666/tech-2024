const { GraphQLID, 
    GraphQLObjectType,
    GraphQLBoolean, 
    GraphQLString,
    GraphQLInputObjectType,
    GraphQLList,
    GraphQLSchema} = require('graphql')
const resolvers = require('./resolvers')

const User = new GraphQLObjectType({
    name: 'User',
    fields: {
        _id: {type: GraphQLID},
        name: {type: GraphQLString},
        lastname: {type: GraphQLString},
        email: {type: GraphQLString},
        avatar: {type: GraphQLString}
    }
})

const Message = new GraphQLObjectType({
    name: 'Message',
    fields: {
        _id: {type: GraphQLID},
        body: {type: GraphQLString},
        from: {type: User},
        to: {type: User},
        readed: {type: GraphQLBoolean}
    }
})

const Userfilterinput = new GraphQLObjectType({
    name: 'UserFilterInput',
    fields:{
        name: {type: GraphQLString},
        lastname: {type: GraphQLString},
        email: {type: GraphQLString}
    }
})

const queries ={
    hello:{
        type: GraphQLString,
        resolve: resolvers.hello
    },
    User:{
        type: User,
        resolve: resolvers.User,
        args:{
            id: {type: GraphQLID},
        }
    },
    Users: {
        type:  GraphQLList(User),
        resolve: resolvers.Users
      },

    UsersByfilter:{
        type:  GraphQLList(User),
        resolve: resolvers.UsersByfilter,
        args:{
            filter: {type: Userfilterinput}
        }
    }

}


module.exports =  schema