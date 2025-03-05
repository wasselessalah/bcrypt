const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt =require('bcrypt')

exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const hash=await bcrypt.hash(password,10)

    const user = new User({ username, email, password:hash, role });
    await user.save();

    res.status(201).json({ message: "user create successfully" });
  } catch (error) {
    res.status(500).json({ message: "error server" });
  }
};

exports.login = async (req, res) => {
  
  const { email, password } = req.body;

  
  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password,user.password))) {
      return res.status(401).json({ message: "invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "login successfully", token });
  } catch (error) {
    res.status(500).json({ message: "error server" });
  }
};
