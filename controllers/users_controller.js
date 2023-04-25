const User = require('../models/user');

module.exports.profile = function(req , res){
    //res.end('<h1>User profile</h1>');
    return res.render('user_profile', {
        title: 'user profile'
    });
}

//render the sign up page
module.exports.signUp= function(req , res){
    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    })
}

//render the sign in page
module.exports.signIn = function(req ,res){
    return res.render('user_sign_in',{
        title: "Codeial | Sign In"
    })
}

//get the sign up data

module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    console.log(req.body);
    User.findOne({email: req.body.email} , function(err, user){
        if(err){console.log('error in finding user in signing up'); return}
        
        if(!user){
            User.create(req.body, function(err , user){
                if(err){console.log('error in creating user while signing up'); return}

                return res.redirect('/users/sign-in');
            })
        }  else{
            return res.redirect('back');
        }
    });


}

//sign in and create a session for the user
module.exports.createSession = function(req , res){
    //steps to authenticate
    //find the user
    User.findOne({email: req.body.email} , function(err,user){
        if(err){console.log('error in finding user in signing in'); return}
        //handle user found

        if(user){
             //handle password which do't match
             if(user.password != req.body.password){
                return res.redirect('back');
             }
              //handle session creation
             res.cookie('user_id', user.id);
             return res.redirect('/uesrs/profile');
        } else{
             //handle user not found
             return res.redirect('back');
        }
    });
 
}

//User Sign Out
module.exports.destroysession = (req, res) => {
    try {
        //Predefined by passport to clear session
        req.logout(function (err) {
            if (err) { return next(err); }
        });
        // res.clearCookie('social_palace')
        // req.flash('success', 'user successfully logged out')
        return res.redirect('/');
    } catch (error) {
        console.log(error);
    }
}