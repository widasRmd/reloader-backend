const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const HASH_ROUND = 10

let playerSchema = mongoose.Schema({
    email : {
        type : String,
        require : [true, 'Email harus di isi']
    },
    name : {
        type : String,
        require : [true, 'Nama harus di isi'],
        maxlength : [255, 'Panjang nama harus diantara 3-255 karakter'],
        minlength : [3, 'Panjang nama harus diantara 3-255 karakter']
    },
    username : {
        type : String,
        require : [true, 'Username harus di isi'],
        maxlength : [255, 'Panjang nama harus diantara 3-255 karakter'],
        minlength : [3, 'Panjang nama harus diantara 3-255 karakter']
    },
    password : {
        type : String,
        require : [true, 'Kata sandi harus di isi'],
        maxlength : [255, 'Panjang kata sandi diantara 6-255 karakter'],
        minlength : [6, 'Panjang kata sandi diantara 6-255 karakter']
    },
    role : {
        type : String,
        enum : ['admin', 'user'],
        default : 'user'
    },
    phoneNumber : {
        type : String,
        require : [true, 'Nomor telepon harus di isi'],
        maxlength : [13, 'Panjang nomor telepon terdiri dari 9-13 digit'],
        minlength : [9, 'Panjang nomor telepon terdiri dari 9-13 digit']
    },
    avatar : {  
        type : String
    },
    fileName : {
        type : String
    },
    favorite : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category'
    },

}, { timestamps : true})

playerSchema.path('email').validate(async function (value) {
    try {
        const count = await this.model('Player').countDocuments({email: value})

        return !count;
    } catch (err) {
        throw err
    }
}, attr => `${attr.value} sudah terdaftar`)

playerSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, HASH_ROUND)
    next()
})

module.exports = mongoose.model('Player', playerSchema)