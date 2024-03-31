
const { render } = require('ejs');
const mongodb = require('mongodb');
const BirthdayRecord = require('../models/record').BirthdayRecord;
const AnniversaryRecord = require('../models/record').AnniversaryRecord;
const ObjectId = mongodb.ObjectId;

exports.getIndex = (req,res,next)=>{
    res.render('index',{pageTitle:'Home',path:'/',message: req.flash('message')});
}

exports.getAddBirthday= (req,res,next)=>{           
    res.render('addRecord',{pageTitle:'Add Birthday',path:'/addBirthdayRecord'});
    
}

exports.getAddAnniversary= (req,res,next)=>{
    res.render('addRecord',{pageTitle:'Add Birthday',path:'/addAnniversaryRecord'});

}
exports.getError = (req,res,next)=>{
    const errTyp = req.params.errTyp;
    if(errTyp==='dupErr'){
        res.render('error',
        {errMsg:"Record Already Exists !",
         pageTitle:"Duplicate Record",
         path:'/error/dupErr'});
    }

}

exports.getEventsOftheWeek = (req,res,next)=>{
    const today = new Date();
    const currentWeekStart = new Date(today);
    currentWeekStart.setDate(today.getDate()-today.getDay());
    const currentWeekEnd = new Date();
    currentWeekEnd.setDate(today.getDate()-today.getDay()+6);
    const formatDate=(birthdayString)=>{
        const date = new Date(birthdayString);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthName = months[date.getMonth()];
        const day = ('0' + date.getDate()).slice(-2);
        return monthName + ' ' + day;
      }
    BirthdayRecord.filterByDate(currentWeekStart,currentWeekEnd).then(results=>{
        results.sort((a, b) => new Date(a.date) - new Date(b.date));
        AnniversaryRecord.filterByDate(currentWeekStart,currentWeekEnd).then(anRes=>{
            anRes.sort((a, b) => new Date(a.date) - new Date(b.date));
            res.render('recordList',
            {pageTitle:"Events",
            path:'/showRecords',
            records:results,
            formatDate:formatDate,
            anRecords:anRes
        });

        })

      
    })
    .catch(err=>{
        console.log(err);
    })

    
}

exports.postAddBirthday= (req,res,next)=>{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const eventDate = new Date(req.body.eventDate);
    const bRecord = new BirthdayRecord(firstName,lastName,eventDate,null);
    bRecord.save()
    .then(result=>{

        console.log(result);
        console.log("New Birthday Record Added Successfully.");
        console.log("Redirecting..");
        req.flash('message', 'Record created successfully');
        res.redirect('/');
       
    }).catch(err=>{
        console.log("Error caught @ postBirthday Controller : ",err);
        res.redirect('/error/dupErr');
    });


}


exports.postAddAnniversary = (req,res,next)=>{
    const hname = req.body.hName;
    const wname = req.body.wName;
    const surname = req.body.surname;
    const eventDate = new Date(req.body.eventDate);
    const aRecord = new AnniversaryRecord(hname,wname,surname,eventDate,null);
    aRecord.save()
    .then(result=>{
        console.log(result);
        console.log("New Anniversary Record Added Successfully.");
        console.log("Redirecting..");
        req.flash('message', 'Record created successfully');
        res.redirect('/');

    }).catch(err=>{
        console.log("Error caught @ postAnniversary Controller : ",err)
        res.redirect('/error/dupErr');
    });

}