const express = require('express');
const path = require('path');
const router = express.Router();

const passport = require('passport');

router.get('/', (req, res, next) => {
    res.render('index');
});

router.get('/bootstrap.min.css', (req, res, next) => {
    res.sendFile(path.join(__dirname, '../views/layouts/bootstrap.min.css'));
});

router.get('/signup', (req, res, next) => {
    res.render('signup');
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    passReqToCallback: true
}));

router.get('/signin', (req, res, next) => {
    res.render('signin');
});

router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    passReqToCallback: true
}));

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
});

router.get('/profile', isAuthenticated, (req, res, next) => {
    res.render('profile');
});

function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/signin');
};


module.exports = router;