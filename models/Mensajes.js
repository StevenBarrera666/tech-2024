const mongoose = require('mongoose')
const UserSchema = require('./User')



const MessageSchema = new mongoose.Schema({
body:{
    type: String,
    required: true
},

from:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    require: true
},
to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    require: true
},
readed:{
    type: Boolean,
    required: true,
    default: false
}

},{
    timestamps: true
})

module.exports = mongoose.model('message', MessageSchema)