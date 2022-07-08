const withAuth = (req, res, next) => {
    if (!req.session.user_id){
        res.redirect('/login');
    } else {
        //calls the next middleware or the function that renders
        next();
    }
};

module.exports = withAuth;