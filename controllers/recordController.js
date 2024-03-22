const mongodb = require('mongodb');
const BirthdayRecord = require('../models/record').BirthdayRecord;
const AnniversaryRecord = require('../models/record').AnniversaryRecord;
const ObjectId = mongodb.ObjectId;
const {EventEmitter} = require('events');
const someEventEmitter = new EventEmitter();

exports.getIndex = (req,res,next)=>{
    res.render('index',{pageTitle:'Home',path:'/',message: req.flash('message')});
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
        console.log("New Birthday Record Added Successfully.");
        req.flash('message', 'Record created successfully');
        res.status(201).redirect('/');
    }).catch(err=>{
        console.error("Error caught @ postBirthday : ",err);
        res.status(400).redirect('/error/dupErr');
    });
}

exports.postAddAnniversary = (req,res,next)=>{
    const hname = req.body.hName;
    const wname = req.body.wName;
    const surname = req.body.surname;
    const eventDate = req.body.eventDate;
    const aRecord = new AnniversaryRecord(hname,wname,surname,eventDate,null);
    aRecord.save()
    .then(result=>{
        console.log("New Anniversary Record Added Successfully.");
        req.flash('message', 'Record created successfully');
        res.status(201).redirect('/');

    }).catch(err=>{
        console.error("Error caught @ postAnniversary : ",err);
        res.status(400).redirect('/error/dupErr');
    });

}

exports.getError = (req,res,next)=>{
    const errTyp = req.params.errTyp;
    if(errTyp==='dupErr'){
        res.render('error',{pageTitle:"Record Exists",errMsg:"Record Already Exists !!"});
    }
}