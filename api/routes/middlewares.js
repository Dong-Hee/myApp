exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    } else {
        res.status(403).send('login plz ~');
    }
}

exports.isNotLoggedIn = (req, res, neext) => {
    if (!req.isAuthenticated()){
        next();
    } else {
        res.redirect('/');
    }
};