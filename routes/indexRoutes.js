const express = require('express');
const path = require('path');
const Record = require('../models/record');
const router = express.Router();
const recordController = require('../controllers/recordController')


router.get('/',recordController.getIndex);
router.get('/addBirthdayRecord',recordController.getAddBirthday);
router.get('/addAnniversaryRecord',recordController.getAddAnniversary);
router.post('/addBirthday',recordController.postAddBirthday);
router.post('/addAnniversary',recordController.postAddAnniversary);
router.get('/error/:errTyp',recordController.getError);


// router.get('/add-record',(req,res)=>{
//     console.log('Add record page');
//     res.render('addRecord',{path:'/add-record'});
// })

// router.post('/record-saved',(req,res)=>{
//     console.log('Received Data:', req.body);
//     let record = new Record();
//     if(req.body.eventType==='Birthday'){
//         record.birthday_in(req.body.firstName,req.body.lastName,req.body.eventDate[0])
//     }else if(req.body.eventType==='Anniversary'){
//         record.anniversary_in(req.body.husbandsName,req.body.wifesName,req.body.surname,req.body.eventDate[0]);
//     }

//     record.save();
//     console.log("Record Saved")
//     console.log('..Redirecting')
//     res.redirect('/add-record')
// })


module.exports = router;