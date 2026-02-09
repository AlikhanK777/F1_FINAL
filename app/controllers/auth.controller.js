const config = require("../config/auth.config");
const db = require("../models");
const User = db.user; 
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// redistration
exports.signup = async (req, res) => {
  try {
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8) 
    });

    await user.save();
    
    
    if (req.body.roles) {
      const roles = await Role.find({ name: { $in: req.body.roles } });
      user.roles = roles.map(role => role._id);
      await user.save();
    } else {
      const role = await Role.findOne({ name: "user" });
      user.roles = [role._id];
      await user.save();
    }

    res.send({ message: "User was registered successfully!" });
    console.log(`Пользователь ${req.body.username} зарегистрирован.`);
    
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// VHOD
exports.signin = async (req, res) => {
  try {
    console.log("Searching for user: " + req.body.username);
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }

    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 
    });

    res.status(200).send({
      id: user._id,
      username: user.username,
      accessToken: token
    });

  } catch (err) {
    console.error("Signin error:", err);
    res.status(500).send({ message: err.message });
  }
};