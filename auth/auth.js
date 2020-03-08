const express = require('express');
const session = require('cookie-session');
const crypt = require('bcryptjs');
const config = require('../config');
const router = express.Router();
const users = require('../models/users');
const app = express();

app.use(session({
    name: 'session',
    keys: config.keys,
    secret: config.sessionkey,
    cookie: {
        secure: false,
        httpOnly: true,
        path: 'cookie',
        expires: new Date(Date.now() + 60 * 60 * 1000 * 24 * 365)
    }
}));

router.get('/', (req,res)=>{
    if(isAuthenticated(req)){
        res.send(req.session.user);
    } else {
        res.send({"message":"Authenticate first."});
    }
});

router.post("/login", (req, res) => {
    const email = req.body.email;
    const userpass = req.body.userpass;
    users.findUserByEmail(email,function(user){
        if(crypt.compareSync(userpass,user[0].userpass)){
            req.session.user = user;
            res.send(user);
        }
    });
});

router.post("/logout", (req,res)=> {
    req.session = null;
    res.redirect("/");
});

router.post("/register", (req, res) => {
    var user = { "username": req.body.username, "userpass": crypt.hashSync(req.body.userpass, 10) , "email": req.body.email, "birthDate": req.body.birthDate };
    users.createUser(user,(err)=>{
        if(!err){
            res.send({ "message":"Login" });
        } else {
            res.send({ "message":"Something went wrong during registration please retry." });
        }
    });
    
});

router.post("/unregister", isAuthenticated, (req, res) => {
    var email = req.body.email;
    if(isAuthenticated(req)){
        users.findUserByEmail(email,function(user){
            if(req.session.user == user){
                if(crypt.compareSync(req.body.userpass,user[0].userpass)){
                    req.session = null;
                    users.deleteUserByEmail(email,function(err){
                        if(err){
                            res.send({ "message":"Something went wrong while deleting the user please retry." });
                        } else {
                            res.send({ "message":"User deleted successfully" });
                        }
                    });
                }
            }
        });
    } else {
        res.send({ "message":"Authenticat first." });
    }
});

function isAuthenticated(req){
    return req.session.user != null;
}

module.exports.app = app;
module.exports.Router = router;
module.exports.isAuthenticated = isAuthenticated;