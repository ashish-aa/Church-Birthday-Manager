const mongodb = require('mongodb');
const BirthdayRecord = require('../models/record').BirthdayRecord;
const AnniversaryRecord = require('../models/record').AnniversaryRecord;
const ObjectId = mongodb.ObjectId;

exports.getIndex = (req,res,next)=>{
    res.render('index',{pageTitle:'Home',path:'/'});
}

exports.getAddBirthday= (req,res,next)=>{
    res.render('addRecord',{pageTitle:'Add Birthday',path:'/addBirthdayRecord'});
    
}

exports.getAddAnniversary= (req,res,next)=>{
    res.render('addRecord',{pageTitle:'Add Birthday',path:'/addAnniversaryRecord'});

}

exports.postAddBirthday= (req,res,next)=>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const eventDate = req.body.eventDate;
    const bRecord = new BirthdayRecord(firstName,lastName,eventDate,null);
    bRecord.save()
    .then(result=>{
        if(result.exist){
            res.status(200).json({message:'exists'})
        }else if(result.success){
            res.status(200).json({ message: 'Record added successfully' });
            console.log("New Birthday Record Added Successfully.");
            console.log("Redirecting..");
            res.redirect('/');
        }else{
            res.status(500).json({ message: 'Error adding record', error: result.error });
        }
        // console.log(result);
        // console.log("New Birthday Record Added Successfully.");
        // console.log("Redirecting..");
        // res.redirect('/');
    }).catch(err=>console.log(err));


}

exports.postAddAnniversary = (req,res,next)=>{
    const hname = req.body.hName;
    const wname = req.body.wName;
    const surname = req.body.surname;
    const eventDate = req.body.eventDate;
    const aRecord = new AnniversaryRecord(hname,wname,surname,eventDate,null);
    aRecord.save()
    .then(result=>{
        console.log(result);
        console.log("New Anniversary Record Added Successfully.");
        console.log("Redirecting..");
        res.redirect('/');

    }).catch(err=>console.log(err));

}