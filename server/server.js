import express from "express";
import cors from "cors";
import connectToDB from "./database/connectDB.js";
import UserModel from "./database/models/UserModel.js";
import nodemailer from "nodemailer";
import "dotenv/config";
import path from "path";


const PORT = 3000;
const app = express();

// for deploying
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "build")));

// cors port should be the same as client port
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
// to grab data from client side and process it in server side
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setup the nodemailer to send email
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
//check the nodemailer if it works
transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Nodemailer runs successfully");
  }
});

app.get("/", (req, res) => {
 res.sendFile(path.join(__dirname, "build", "index.html"));
  
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const checkEmail = UserModel.findOne({ email });
    // check email if exists in DB
    // if (checkEmail){
    //  return res.status(409).json({message: "Email already exists"})
    // }

    // generate OPT. we will generate 4 digits, if we need to generate more that 4, increase 1000 and 9000 digits by 0
    const otp = Math.floor(1000 + Math.random() * 9000);

    // create new user
    const newUser = new UserModel({
      username: username,
      email: email,
      password: password,
      otp: otp,
    });

    // nodemailer process
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "OTP for registration",
      html: `
    <div style="background-color: #000; color:#fff; padding: 20px; border-radius:10px; text-align:center">
    <p>Hello ${username}</p>
    <p>"OTP for your registration is " ${otp}</p> 
    </div>
    `,
    };

    transporter.sendMail(mailOptions, (error, success) => {
      if (error) {
        console.log(error);
      } else {
        return res.status(200).json({ message: "OTP sent" });
      }
    });

    // save the nse user in DB
    await newUser.save();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "error occurred while registering user" });
  }
});

// create route to handle check OTP value
app.post("/check-OTP", async (req, res) => {
 const otpValue = parseInt(req.body.otpValue)
 try{
   const otpDB = await UserModel.findOne({otp:otpValue})
   if (otpDB && otpDB.otp !== undefined){
    return res.status(200).json({message: "OTP Verified"})
   }
   return res.status(400).json({error: "Incorrect OTP"})


 }catch(error){
  console.log(error)
  return res
    .status(500)
    .json({ error: "error occurred while registering user" });
 }
});

app.listen(PORT || process.env.PORT, () => {
  console.log("Server run on port " + PORT);
  connectToDB();
});
