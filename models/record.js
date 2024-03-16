const mongodb = require('mongodb');

const getDb = require('../util/database').getDb;
class BirthdayRecord {
    constructor(fname, lname, date, Bid) {
        this.fname = fname;
        this.lname = lname;
        this.date = date;
        this._id = Bid;
    }

    save() {
        const db = getDb();

        return db.collection('Birthday')
            .findOne({ fname: this.fname, lname: this.lname, date: this.date })
            .then(existingRecord => {
                if (existingRecord) {
                    // If the record already exists, show a popup message
                   return {exist:true};
                } else {
                    // If the record does not exist, insert it into the database
                    return db.collection('Birthday')
                        .insertOne(this)
                        .then(result => {
                            console.log(result);
                            return {exist:false,success:true};
                        })
                        .catch(err => {
                            console.log(err);
                            return { exist: false, success: false, error: err };
                        });
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
}




class AnniversaryRecord{
    constructor(hname,wname,surname,date,Aid){
        this.hname = hname;
        this.wname =wname;
        this.surname = surname;
        this.date = date;
        this._id = Aid;
    }

    save(){
        const db = getDb();
        return db.collection('Anniversary')
        .insertOne(this)
        .then(result=>{
            console.log(result);
        })
        .catch(err=>{
            console.log(err);
        })
    }
}

exports.BirthdayRecord = BirthdayRecord;
exports.AnniversaryRecord = AnniversaryRecord;