const db = require('../db/db');

function findUserByEmail(email,callback){
    db.execute("select * from Users where email = ?;",[email],function(err,rows,fields){
        callback(rows);
    });
}

function findUserById(id,callback){
    db.execute("select * from Users where id = ?;",[id],function(err,rows,fields){
        callback(rows);
    });
}

function createUser(user,callback){
    db.execute("insert into Users(username,birthDate,userpass,email) values(?,?,?,?);",[user.username,user.birthDate,user.userpass,user.email],function(err,rows,fields){
        callback(err);
    });
}

function deleteUserById(id,callback){
    db.execute("delete from Users where Users.id = ?;",[id],function(err,rows,fields){
        callback(err);
    });
}

function deleteUserByEmail(email,callback){
    db.execute("delete from Users where Users.email = ?;",[email],function(err,rows,fields){
        callback(err);
    });
}

function updateUserById(id,jsonUser,callback){
    return {};
}

function updateUserByEmail(id,jsonUser,callback){
    return {};
}

module.exports.findUserByEmail = findUserByEmail;
module.exports.findUserById = findUserById;
module.exports.createUser = createUser;
module.exports.deleteUserById = deleteUserById;
module.exports.deleteUserByEmail = deleteUserByEmail;
module.exports.updateUserById = updateUserById;
module.exports.updateUserByEmail = updateUserByEmail;