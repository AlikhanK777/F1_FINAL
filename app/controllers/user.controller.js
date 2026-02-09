const db = require("../models");
const User = db.user;


exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).send({ message: "User not found." });
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

// update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.userId, 
      { username: req.body.username, email: req.body.email },
      { new: true }
    ).select("-password");
    
    res.status(200).send({ message: "Profile updated!", updatedUser });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};