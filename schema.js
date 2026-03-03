import mongoose from 'mongoose'

const schema = mongoose.Schema;
const userSchema = new schema({
    name: {type: String, require: true},
    age: {type: Number, require: true},
    aadhar: {type: Number, default: 0}
})

const modelSchema = mongoose.model('User', userSchema)
export default modelSchema