const User = require("../models/User");
const service = require("../functions");
const jwt = require("jsonwebtoken");

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  //incorrect email or incorrect password
  if (err.message === 'Incorrect email and/or password') {
    errors.email = err.message;
    errors.password = err.message;
  }
  if (err.code === 11000) {
    errors.email = "that email is already registered";
  }

  // validation erros;
  if (err.message.includes("user validation failed")) {
    console.log(
      Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      })
    );
  }
  return errors;
};
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, "baki secret", {
    expiresIn: maxAge
  });
};

module.exports.signupGet = (req, res) => {
  res.render("signup");
};
module.exports.loginGet = (req, res) => {
  res.render("login");
};
module.exports.signupPost = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({user: user._id});
  } catch (e) {
    const errors = handleErrors(e);

    res.status(400).json({ errors });
  }
};
module.exports.loginPost = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({user: user._id})
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });

  }

};

module.exports.logoutGet = (req, res) => {
  res.cookie('jwt', '', {maxAge: 1});
  res.redirect('/');
}