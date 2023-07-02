const router=require('express').Router()
const regc=require('../controllers/regcontroller')
const bannerc=require('../controllers/bannercontroller')
const servicec=require('../controllers/servicecontroller')
const queryc=require('../controllers/querycontroller')
const testic=require('../controllers/testicontroller')
const contactc=require('../controllers/contactcontroller')
const bcrypt=require('bcrypt')
const Reg=require('../models/reg')
const multer= require('multer')
function handlelogin(req,res,next){
    if(req.session.manJeet){
        next()
    }else{
        res.redirect('/admin')
    }
}
 
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./public/upload')
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+file.originalname)
    }
})

const upload=multer({
    storage:storage,
    limits:{fileSize:1024*1024*4}
})

router.get('/',regc.adminloginshow)
router.post('/loginrecord',async(req,res)=>{
    const{us,pass}=req.body
    const record=await Reg.findOne({username:us})
    //console.log(record)
    if(record!==null){
        const comparepass=await bcrypt.compare(pass,record.password)
        if(comparepass){
            req.session.manJeet=true
        res.redirect('/admin/dashboard')
    }else{
        res.render('admin/login.ejs',{mess:'Wrong Password'})
    }
    }else{
        res.render('admin/login.ejs',{mess:'User not found'})
    }
})
router.get('/dashboard',handlelogin,regc.admindashboard)
router.get('/logout',regc.adimnlogout)
router.get('/banner',handlelogin,bannerc.adminbannershow)
router.get('/bannerupdate/:id',handlelogin,bannerc.bannerupdate)
router.post('/bannerupdaterecord/:id',upload.single('img'),bannerc.bannerrecord)
router.get('/service',handlelogin,servicec.aadminserviceshow)
router.get('/serviceadd',handlelogin,servicec.serviceadd)
router.post('/serviceadd',upload.single('img'),servicec.servicerecord)
router.get('/servicedelete/:id',handlelogin,servicec.servicedelete)
router.get('/serviceupdate/:id',handlelogin,servicec.serviceupdate)
router.get('/query',handlelogin,queryc.queryallselection)
router.get('/queryreply/:id',handlelogin,queryc.queryform)
router.post('/queryreply/:id',upload.single('attachment'),queryc.sendquerymail)
router.post('/testi',upload.single('img'),testic.testirecord)
router.get('/testi',handlelogin,testic.testiselection)
router.get('/testidelete/:id',handlelogin,testic.delete)
router.get('/testiupdate/:id',handlelogin,testic.testiupdate)
router.get('/contact',handlelogin,contactc.showall)
router.get('/contactupdate/:id',handlelogin,contactc.contactupdateform)
router.post('/contactupdate/:id',contactc.contactupdate)
router.get('/test',handlelogin,regc.test)
router.get('/test2',handlelogin,bannerc.test2)
router.post('/servicesearch',handlelogin,servicec.servicesearch)
router.get('/adminchangepass',handlelogin,regc.changepassshow)
router.post('/adminchangepass',handlelogin,regc.passchange)
module.exports=router