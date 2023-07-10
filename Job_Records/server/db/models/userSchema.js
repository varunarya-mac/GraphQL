import {Schema, model} from 'mongoose'

const userSchema = new Schema({
    companyId: String,
    email: String,
    password: String
})

export default model('users', userSchema)