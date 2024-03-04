const mongoose = require('mongoose');
const UserSchema = require('../models/User');
const MessageSchema = require('../models/Mensajes');

const ChatSchema = mongoose.Schema({
    from : {
        type: mongoose.UserSchema.Types.objectId,
        ref:'user',
        required: true

    },
    to:{
        type: mongoose.UserSchema.Types.objectId,
        ref:'user',
        required: true
    },

    message:{
        type:[{type: mongoose.UserSchema.Types.objectId,
            ref:'user',
            required: true}],
        required: true
    }

},{
    timestamps: true

})

module.exports = mongoose.module('chat', ChatSchema)