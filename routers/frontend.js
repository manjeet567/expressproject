const router=require('express').Router()
const Banner=require('../models/banner')
const Services=require('../models/service')
const Testi=require('../models/testinomial')
const bannerc=require('../controllers/bannercontroller')
const servicec=require('../controllers/servicecontroller')
const queryc=require('../controllers/querycontroller')
const testic=require('../controllers/testicontroller')
const Contact=require('../models/contact')


router.get('/',async(req,res)=>{
    const footer=await Contact.findOne()
    const testirecord=await Testi.find({status:'publish'})
    const servicerecord=await Services.find({status:'publish'})
    const bannerrecord=await Banner.findOne()
    res.render('index.ejs',{bannerrecord,servicerecord,testirecord,footer})
})
router.get('/banner',bannerc.bannershow)
router.post('/query',queryc.queryinsert)
router.get('/testi',testic.testiformshow)
router.get('/servicepage/:id',servicec.servicesinglerecord)


module.exports=router