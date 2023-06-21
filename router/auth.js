const express = require('express');
const User = require('../model/userSchema');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');


const keysecret = process.env.SECRET_KEY;

const Authenticate = require("../middleware/authenticate");
const cookieParser = require("cookie-parser");
// const { error } = require('console');
// const { ifError } = require('assert');

router.use(cookieParser());

require('../db/conn');

router.get('/', (req, res) => {
    res.send(`Hello world from the server rotuer js`);
});

router.post('/register', async (req, res) => {

    // res.json({ message: req.body });
    // res.send("mera register page");
    const { name, email, phone, work, password, cpassword } = req.body;
    // console.log(req.body);
    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "plz filled all boxes" });
    }

    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(422).json({ error: "email already exits" });
        }
        else if (password != cpassword) {
            return res.status(422).json({ error: "Password are not matching" });
        }
        else {
            // console.log(user);
            const user = new User({ name, email, phone, work, password, cpassword });
            //middleware for bcrypt used in userscheme
            await user.save();
            res.status(201).json({ message: "User Registered Successfully" })
        }

    } catch (err) {
        console.log(err);
    }
});

//user login 

router.post('/login', async (req, res) => {
    let token;
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(422).json({ error: "Please fill e-mail and Password" });
    }
    // console.log(req.body);
    try {
        const userlogin = await User.findOne({ email: email });
        // if(!userlogin){
        //     res.status(422).json({ error: "Invalid Credentials" });
        // }
        // console.log(userlogin);
        //generating token for userlogin to see aboutMe file if user login then see it's pages
        token = await userlogin.generateAuthtoken();
        // console.log(token);

        res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + 9247895400),
            httpOnly: true
        });

        // console.log(userlogin);

        if (userlogin) {
            const isMatch = await bcrypt.compare(password, userlogin.password);
            if (!isMatch)
                res.status(422).json({ error: "Invalid Credentials" });

            else {
                res.status(201).json({ message: "User Login Successful" })
            }
        }
        else {
            res.status(422).json({ error: "Invalid Credentials" });
        }
    } catch (err) {
        console.log(err);
    }
});
// ==========================================
//when  about page gets click  then  router  route the pages by getting the url
// ========================================
router.get('/about', Authenticate, (req, res) => {
    // console.log('hello about page in auth.js');
    res.send(req.rootUser);
});

//get user data from backend to store in contact us and home page

router.get('/getdata', Authenticate, (req, res) => {
    // console.log('Hello from the side of contact pages int auth.js ');
    res.send(req.rootUser);

});


// ========================================
//logout by the user 
// ==========================================


router.get('/logout', (req, res) => {
    console.log('hello to my logout page');
    res.clearCookie('jwtoken', { path: '/' });
    res.status(200).send('User Logout Successfully...');
});

router.post('/contact', Authenticate, async (req, res) => {
    try {
        const { name, email, message, phone } = req.body;
        // console.log(req.body);
        // console.log(name);
        // console.log(message);
        if (!name || !email || !phone || !message) {
            console.log("Eror occuured from auth.js...");
            return res.status(422).json({ message: "Please filled the all required data provided" });
        }
        const userContact = await User.findOne({ _id: req.userID });
        if (userContact) {
            const userMeassage = await userContact.addMessage(name, email, phone, message);
            await userContact.save();
            res.status(201).json({ message: "user contact success" });
        }
    } catch (error) {
        console.log(error);
    }
});


//send link to email for reset password

router.post('/setpasswordlink', async (req, res) => {
    // res.status(201).json();
    // console.log(req.body);
    const { email } = req.body;
    if (!email) {
        return res.status(422).json({ status: 422, message: "Enter Your Mail" });
    }

    let mailOptions;

    const userfind = await User.findOne({ email: email });
    // console.log(userfind);
    //token generate for reset password

    const token = jwt.sign({ _id: userfind._id }, keysecret, {
        expiresIn: "3d"
    });
    // console.log("token", token);
    const setusertoken = await User.findByIdAndUpdate({ _id: userfind._id }, { verifytoken: token }, { new: true });
    // console.log("setusertoken", setusertoken);

    let transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'satyamjsw2000@gmail.com', // generated ethereal user
            pass: 'flugvwbzjpjlhcjw', // generated ethereal password
        },
    });

    let info = await transporter.sendMail({
        from: '"stayam jaiswal " <satyamjsw2000@gmail.com>', // sender address
        to: "satyamjsw12@gmail.com", // list of receivers
        subject: "reset password", // Subject line
        html: `link is valid for 2 day http://127.0.0.1:3000/forget/${userfind.id}/${setusertoken.verifytoken}`,
    });

    console.log("Message sent: %s ", info.messageId);
    res.json(info.response);
});

// verify user forget password time
router.get("/forgotpassword/:id/:token", async (req, res) => {

    const { id, token } = req.params;
    // console.log("hello1");
    console.log({ id, token });
    try {
        const validuser = await User.findOne({ _id: id, verifytoken: token });
        console.log(validuser);
        const verifyToken = jwt.verify(token, keysecret);
        if (validuser && verifyToken._id) {
            // console.log("hello");
            res.json({ message: 1 });
        } else {
            res.json({ message: 0 });

        }
    } catch (error) {
        console.log(error);
        res.status(401).json({ status: 401, error })
    }

})

//change password 

router.post("/changepassword/:id/:token", async (req, res) => {
    const { id, token } = req.params;
    const { password } = req.body;
    console.log({ id, token, password });

    try {
        const validuser = await User.findOne({ _id: id, verifytoken: token });
        console.log(validuser);
        const verifyToken = jwt.verify(token, keysecret);
        if (validuser && verifyToken._id) {
            const newpassword = await bcrypt.hash(password, 12);
            const setnewpassword = await User.findByIdAndUpdate({ _id: id }, { password: newpassword });
            setnewpassword.save();
            res.status(201).json({ setnewpassword });

        } else {
            res.status(401).json({ message: "user does not exits" });
        }
    } catch (error) {
        res.status(401).json({ error })
    }
})



module.exports = router;