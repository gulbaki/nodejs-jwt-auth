const User = require("../models/User");
const service = require("../functions");

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  if (err.code === 11000) {
      errors.email = 'that email is already registered';
  }
  
  // validation erros;
  if (err.message.includes("user validation failed")) {
    console.log(
      Object.values(err.errors).forEach(({properties}) => {
       errors[properties.path] = properties.message;
      })
    );
  }
  return errors;
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
    res.status(201).json(user);
  } catch (e) {
    const errors = handleErrors(e);

    res.status(400).json({errors});
  }
};
module.exports.loginPost = async (req, res) => {
  const { email, password } = req.body;

  
  res.send("new login");
};
