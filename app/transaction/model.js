const mongoose = require('mongoose')
let transactionSchema = mongoose.Schema({
    historyVoucherTopup : {
        gameName : {type : String, require : [true, 'Nama game harus diisi']},
        category : {type : String, require : [true, 'Kategori harus diisi']},
        thumbnail : {type : String},
        coinName : {type : String, require : [true, 'NNama koin harus diisi']},
        coinQuantity : {type : String, require : [true, 'Jumlah koin harus diisi']},
        price : {type : Number},
    },

    historyPayment : {
        name : {type : String, require : [true, 'Nama harus diisi']},
        type : {type : String, require : [true, 'tipe pembayaran harus diisi']},
        bankName : {type : String, require : [true, 'Nama bank harus diisi']},
        noRekening : {type : String, require : [true, 'Nomor Rekening harus diisi']},
    },

    historyUser : {
        name : {type : String, require : [true, 'Nama harus diisi']},
        phoneNumber : {
            type : String,
            require : [true, 'Nomor telepon harus diisi'],
            maxlength : [13, 'Panjang nomor telepon terdiri dari 9-13 digit'],
            minlength : [9, 'Panjang nomor telepon terdiri dari 9-13 digit']
        }
    },

    name : {
        type : String,
        require : [true, 'Nama harus diisi'],
        maxlength : [255, 'Panjang nama harus diantara 3 - 255'],
        minlength : [3, 'Panjang nama harus diantara 3 - 255']
    },

    accountUser : {
        type : String,
        require : [true, 'Nama harus diisi'],
        maxlength : [255, 'Panjang nama harus diantara 3 - 255'],
        minlength : [3, 'Panjang nama harus diantara 3 - 255']
    },

    tax : {
        type : Number,
        default : 0
    },

    value : {
        type : Number,
        default : 0
    },
    
    status : {
        type : String,
        enum : ['pending', 'success', 'failed'],
        default : 'pending'
    },

    player : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Player'
    },

    category : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Category'
    },
    
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },

}, { timestamps : true})

module.exports = mongoose.model('Transaction', transactionSchema)