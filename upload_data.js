const xlsx = require('xlsx');
require('dotenv').config() 
const bcrypt = require('bcrypt');



const DB_URL = process.env.DB_URL || '';
const mongoose = require('mongoose'); // Importo la libreria mongoose
mongoose.connect(DB_URL)
const UserSchema = require('./models/User');

const workbook = xlsx.readFile('datos.xls')
const sheer_list = workbook.SheetNames
const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheer_list[0]])

for(const user of data){

    const hashedPassword = bcrypt.hashSync(user.password,10)

    user.password = hashedPassword
}

UserSchema.insertMany(data).then(()=>{
    console.log('Informacion subida exitosamente')
}).catch(err=> console.log("Error",err))