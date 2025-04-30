const router = require("express").Router();
const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/test", (req, res) => {
  res.send("User route");
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, profileImage } = req.body;

    const userCheck = await User.findOne({ email });

    if (userCheck) {
      res.status(400).json({ msg: "Email is already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      profileImage,
    });

    await newUser.save();

    const user = await User.findOne({ email });

    res.status(201).send({
      message: "Account created successfully!",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        created: user.created,
      },
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  console.log("Login here")
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        token: token,
        created: user.created,
      },
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const { id } = req.query; // Accessing query parameters instead of body
    
    // console.log("user ID:", id);

    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        token: user.token,
        created: user.created,
      },
      success: true,
    });
  } catch (err) {
    console.error("Error fetching user data:", err);

    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.post("/update", async (req, res) => {
  try {
    const { _id, name, email, profileImage } = req.body;

    // Check if user exists
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user details
    user.name = name;
    user.email = email;
    user.profileImage = profileImage;

    // Save updated user details
    await user.save();

    res.status(200).json({
      message: "Profile details updated successfully!",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        created: user.created,
      },
      success: true,
    });
  } catch (err) {
    console.error("Error updating profile details:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const { _id } = req.body;

    // Check if user exists
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete user account
    await User.findByIdAndDelete(_id);

    res.status(200).json({
      message: "User account deleted successfully!",
      success: true,
    });
  } catch (err) {
    console.error("Error deleting user account:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


module.exports = router;
