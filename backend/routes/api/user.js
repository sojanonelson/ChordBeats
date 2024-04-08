const router = require("express").Router();
const User = require("../../models/user")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get("/test", (req, res) => {
  res.send("User route");
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, profileImage } = req.body;
    if(!profileImage){
        res.status(400).json({msg: "Please provide a profile image"})
    }
    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        profileImage
      
    })

    await newUser.save()

    const user = await User.findOne({email});

    res.status(201).send({
      message: "Account created successfully!",
      user:{
        _id: user._id,
        name: user.name,
        email: user.email,
        profileImage: user.profileImage,
        created: user.created
    },
    success: true
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/login', async (req,res)=> {

    try{

        const {email,password} = req.body

        const user = await User.findOne({email});
        
        if(!user){
            return res.status(400).json({message: 'Invalid email or password'});

        }

        const isPassword = bcrypt.compare(password, user.password)
        if(!isPassword){
            return res.status(400).json({message: 'Invalid email or password'});
        }

        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'})
        res.status(200).json({
            user:{
                _id: user._id,
                name: user.name,
                email: user.email,
                profileImage: user.profileImage,
                token: token,
                created: user.created
            },
            success: true
        })

    }catch(err){
        console.log(err)
    }

})

module.exports = router;
