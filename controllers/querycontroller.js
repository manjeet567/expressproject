const Query=require('../models/query')
const nodemailer=require('nodemailer')


exports.queryinsert=async(req,res)=>{
const{email,query}=req.body
const record=new Query({email:email,query:query})
await record.save()
//console.log(record)
res.redirect('/')
}
exports.queryallselection=async(req,res)=>{
const record=await Query.find()
res.render('admin/query.ejs',{record})
}
exports.queryform=async(req,res)=>{
const id=req.params.id
const record=await Query.findById(id)
res.render('admin/queryform.ejs',{record})
}
exports.sendquerymail=async(req,res)=>{
const id=req.params.id
const{emailto,emailfrom,subject,body}=req.body
try{
let testAccount = await nodemailer.createTestAccount();
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'lavaboyyttt@gmail.com', // generated ethereal user
    pass: 'cyjmfxwyvlupfksj', // generated ethereal password
  },
});
if(req.file){
  const path=req.file.path
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: emailfrom, // sender address
    to: emailto, // list of receivers
    subject:subject, // Subject line
    text:body, // plain text body
    //html: "<b>Hello world?</b>", // html body
    attachments:[{
        path:path
    }]
  });
}else{
  let info = await transporter.sendMail({
    from: emailfrom, // sender address
    to: emailto, // list of receivers
    subject:subject, // Subject line
    text:body, // plain text body
    //html: "<b>Hello world?</b>", // html body
  });
}
await Query.findByIdAndUpdate(id,{status:'closed'})
  res.redirect('/admin/query')
}catch(error){
  res.send('Bad Internet Connection OR Internal Error')
}
}