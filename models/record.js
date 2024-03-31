const mongodb = require('mongodb');


const getDb = require('../util/database').getDb;
class BirthdayRecord {
    constructor(fname, lname, date, Bid) {
        this.fname = fname;
        this.lname = lname;
        this.date = date;
        this._id = Bid;
    }

    static filterByDate(startDate,endDate){
        const db = getDb();

        return db.collection('Birthday')
        .find(
            {
                $or: [
                    {
                        $and: [
                            { $expr: { $eq: [{ $month: "$date" }, { $month: startDate }] } },
                            { $expr: { $gte: [{ $dayOfMonth: "$date" }, { $dayOfMonth: startDate }] } }
                        ]
                    },
                    {
                        $and: [
                            { $expr: { $eq: [{ $month: "$date" }, { $month: endDate }] } },
                            { $expr: { $lte: [{ $dayOfMonth: "$date" }, { $dayOfMonth: endDate }] } }
                        ]
                    }
                ]
            }
        ).toArray()
        .then(records => {
            console.log('Birthdays in the current week:', records);
            return records;
          })
          .catch(error => {
            console.error('Error finding birthdays:', error);
          });
    }

    save() {
        const db = getDb();

        return db.collection('Birthday')
            .findOne({ fname: this.fname, lname: this.lname, date: this.date })
            .then(existingRecord => {
                if (existingRecord) {
                    // If the record already exists, show a popup message
                    return Promise.reject(new Error("Record Already Exists!"));
                } else {
                    // If the record does not exist, insert it into the database
                    return db.collection('Birthday')
                        .insertOne(this)
                        .then(result => {
                            console.log(result);
                            
                        })
                        .catch(err => {
                            console.log(err);
                            
                        });
                }
            })
            .catch(err => {
                console.log("Error caught @ Birthday Class : ",err);
                throw err;
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


    static filterByDate(startDate,endDate){
        const db = getDb();

        return db.collection('Anniversary')
        .find({
            $or: [
                {
                    $and: [
                        { $expr: { $eq: [{ $month: "$date" }, { $month: startDate }] } },
                        { $expr: { $gte: [{ $dayOfMonth: "$date" }, { $dayOfMonth: startDate }] } }
                    ]
                },
                {
                    $and: [
                        { $expr: { $eq: [{ $month: "$date" }, { $month: endDate }] } },
                        { $expr: { $lte: [{ $dayOfMonth: "$date" }, { $dayOfMonth: endDate }] } }
                    ]
                }
            ]
        }).toArray()
        .then(records => {
            console.log('Anniversaries in the current week:', records);
            return records;
          })
          .catch(error => {
            console.error('Error finding Anniversaries:', error);
          });
    }
    save(){
        const db = getDb();
        return db.collection('Anniversary')
        .findOne({hname:this.hname,wname:this.wname,surname:this.surname,date:this.date})
        .then(existingRecord=>{
            if(existingRecord){
                return Promise.reject(new Error("Record Already Exists"));
            }else{
                return db.collection('Anniversary')
                .insertOne(this)
                .then(result => {
                    console.log(result);
                    
                })
                .catch(err => {
                    console.log(err);
                    
                });

            }
        })
        .catch(err=>{
            console.log("Error caught @Anniversary Class : ",err);
            throw err
        })
    }
}

exports.BirthdayRecord = BirthdayRecord;
exports.AnniversaryRecord = AnniversaryRecord;