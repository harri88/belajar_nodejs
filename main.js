var database = require('./aksesdata/konek_mongodb');
var db = new database();

// insert data
db.save({
    name:"Harri Muhammad",
    email: "harrimuhammad@gmail.com",
    phone: "081389161683"
},function(ret){
    console.log(ret);

});

// gett all data
db.getAll(function(err,docs){
    if(err)
        console.log(docs);
    else
        console.log(docs);
});
console.log("Hello, World!")