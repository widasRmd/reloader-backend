const Payment = require('./model')
const Bank = require('../bank/model')

module.exports = {
    index : async(req, res) => {
        try {
            const alertMessage = req.flash('alertMessage')
            const alertStatus = req.flash('alertStatus')
            const alert = { message: alertMessage, status: alertStatus}

            const payment = await Payment.find().populate('banks')

            res.render('admin/payment/view_payment', {
                payment,
                alert,
                name : req.session.user.name,
                title : 'Metode Pembayaran'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
        }
    },

    viewCreate : async (req, res) => {
        try {
            const banks = await Bank.find()
            res.render('admin/payment/create', {
                banks,
                name : req.session.user.name,
                title : 'Tambah Metode Pembayaran'
            })
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
        }
    },

    actionCreate : async(req, res) => {
        try {
            const { banks, type } = req.body

            req.flash('alertMessage', 'Berhasil tambah coin')
            req.flash('alertStatus', 'success')

            let payment = await Payment({banks, type})
            await payment.save();

            res.redirect('/payment')

        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
        }
    },

    viewEdit : async(req, res) => {
        try {
            const {id} = req.params

            const banks = await Bank.find()
            const payment = await Payment.findOne({_id : id}).populate('banks')

            res.render('admin/payment/edit', {
                payment,
                banks,
                name : req.session.user.name,
                title : 'Ubah Metode Pembayaran'
            })

        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
        }
    },

    actionEdit : async(req, res) => {
        try {
            const {id} = req.params
            const { banks, type } = req.body

            await Payment.findOneAndUpdate({
                _id : id
            }, {banks, type})

            req.flash('alertMessage', 'Berhasil ubah payment')
            req.flash('alertStatus', 'success')

            res.redirect('/payment')
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
        }
    },
    
    actionDelete : async(req, res) => {
        try {
            const {id} = req.params
            
            await Payment.findOneAndRemove({
                _id : id
            })

            req.flash('alertMessage', 'Berhasil hapus payment')
            req.flash('alertStatus', 'success')
            
            res.redirect('/payment')   
        } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/payment')
        }
    }
}