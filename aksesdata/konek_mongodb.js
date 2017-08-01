var mongo = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var dbUrl = "mongodb://localhost:27017/belajar_nodejs";


var database = module.exports = function(){
    console.log('database was instanced');
};

// get all data
database.prototype.getAll = function(callback){
    mongo.connect(dbUrl, function(err, db) {
        if(!err) {
            db.collection('customers',function(err,coll){
                coll.find().toArray(function(err, items) {
                    db.close();
                    callback(null,items);
                });
            });
        }else{
            db.close();
            callback(err,null);
        }
    });
};

// save
database.prototype.save = function(customer,callback){
    mongo.connect(dbUrl, function(err, db) {
        if(!err) {
            db.collection('customers',function(err,coll){
                if(customer._id) {
                    // update customer
                    coll.update({_id:ObjectID(customer._id)},
                        {$set:{name:customer.name,email:customer.email,phone:customer.phone}},
                        function(err,numberUpdated){
                            db.close();
                            if(numberUpdated>0){
                                callback(1);
                            }else{
                                callback(-1,err);
                            }
                        });
                }else{
                    // insert new customer
                    coll.insert(customer,function(err){
                        db.close();
                        if(!err){
                            callback(1);
                        }else{
                            callback(-1,err);
                        }
                    });
                }
            });
        }else{
            callback(-1,err);
        }
    });
};