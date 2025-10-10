import { upsertStreamUser } from "../lib/stream.js";
import User from "../models/User.js"
import jwt from "jsonwebtoken"
 

 //signup controller
 export async function signup(req,res){

   const { email , password , fullName} =  req.body
   
   try {
      // authtencation 
      if(!email || !password || !fullName){
         return res.status(400).json({ message: "All fields are required"})
      }

      //password min char here 
      if(password.length < 6){
         return res.status(400).json({ message: "password must be at least 6 characters"});
      }

      // check corect email sholud be given by thr user
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
       return res.status(400).json({ message: "Invalid email format" });
      }

      //check email already esistics
      const existinguser = await User.findOne({email});
      if(existinguser){
         return res.status(400).json({ message: "Email already exists , please use a differnt one"});
      }

      // now create the user 
      const idx = Math.floor(Math.random() * 100) + 1; //generate a num b\w 1 - 100
      const randomAvtar = `https://avatar.iran.liara.run/public/${idx}.png`;

      const newUser = await User.create({
         email,
         fullName,
         password,
         profilePic: randomAvtar,
      });


      try {
         
      await upsertStreamUser({
         id: newUser._id.toString(),
         name: newUser.fullName,
         image: newUser.profilePic || "",
      });
      console.log(`Stream user created for ${newUser.fullName} successfully`);
      } catch (error) {
         console.log("Error in creating stream user :", error);
      }


      const token  = jwt.sign({
         userId: newUser._id,  },process.env.JWT_SECRET , {
         expiresIn: "7d",
         });

         res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
            httpOnly: true, // Accessible only by web server
            sameSite: "strict", // CSRF protection
            secure: process.env.NODE_ENV === "production", // Set to true in production
         })

         res.status(201).json({success: true, user: newUser})
   } catch (error) {
      console.log("Error in signup controller", error);
      res.status(500).json({ message: "Internal Server Error"});
   }
 }

   // login controller
 export async function login(req,res){
     try {
      const { email , password} = req.body;
      if(!email || !password){
         return res.status(400).json({ message: "All fields are required"});
      }

      const user = await User.findOne({ email});
      if(!user){
         return res.status(401).json({ message: " Invalid email or password"});
     }
     const isPasswordCorrect = await user.matchPassword(password);
     if(!isPasswordCorrect){
         return res.status(401).json({ message: " Invalid email or password"});
     }

     const token  = jwt.sign({
         userId: user._id,  },process.env.JWT_SECRET , {
         expiresIn: "7d",
         });

         res.cookie("token", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
            httpOnly: true, // Accessible only by web server
            sameSite: "strict", // CSRF protection
            secure: process.env.NODE_ENV === "production", // Set to true in production
         });

         res.status(200).json({ success: true, user});
   }   catch (error) {
      console.log("Error in login controller", error);
      res.status(500).json({ message: "Internal Server Error"});
     }
 }

   // logout controller
 export function logout(req,res){
   res.clearCookie("jwt");
   res.status(200).json({ message: "Logged out successfully"});
 }

 export async function onboard(req,res){
 try {
 const userId = req.user._id;
 const {  fullName , bio , nativeLanguage, learningLanguage , location } = req.body;   
 
      if( !fullName || !bio || !nativeLanguage || !learningLanguage || !location ){
         return res.status(400).json({
            message: "All fields are required",
            missingFields: [
               !fullName && "fullName",
               !bio && "bio",
               !nativeLanguage && "nativeLanguage",
               !learningLanguage && "learningLanguage",
               !location && "location",
            ].filter(Boolean),
         });
      }
      const updatedUser = await User.findByIdAndUpdate(userId,{
         ...req.body,
        isOnboarded: true,
      }, { new: true })

      if(!updatedUser){
         return res.status(404).json({ message: "User not found"});
      }

      //todo : update the user in stream as well
    try {
        await upsertStreamUser({
         id: updatedUser._id.toString(),
         name: updatedUser.fullName,
         image: updatedUser.profilePic || "",
      });
      console.log(`Stream user updated after onboarding for ${updatedUser.fullName} successfully`);
    } catch (streamError) {
      console.log("Error in updating stream user after onboarding :", streamError);
      
    }


      res.status(200).json({ success: true, user: updatedUser });
    } catch (error) {
      
    }
   
 }