module.exports.signupGet = (req, res) =>{
    res.render('signup');
}
module.exports.loginGet = (req, res) =>{
    
    res.render('login');
}
module.exports.signupPost = (req, res) => {
    const {email, password} = req.body;

    res.send('new signup');
}
module.exports.loginPost = (req, res) => {
    const {email, password} = req.body;

   
    console.log(req.body);
    res.send('new login');
}