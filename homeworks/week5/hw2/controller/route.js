module.exports = {
  index: (req, res) =>{
    const nickname = req.session.nickname;
    res.render('index', {nickname});
  },
  
  login: (req, res) => {
    res.render('login');
  },

  register: (req, res) => {
    res.render('register');
  }
}