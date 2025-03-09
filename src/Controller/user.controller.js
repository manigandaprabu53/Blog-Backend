import userModel from "../Model/user.model.js";
import auth from "../Utils/auth.js";
import crypto from "crypto";
import nodemailer from "nodemailer";

const registerUser = async (req, res)=>{
    try {

        let {name, email, password} = req.body;

        if(!name){
            return res.status(400).send({message: "Name is required", error: true, success: false});
        }else if(!email){
            return res.status(400).send({message: "Email is required", error: true, success: false});
        }else if(!password){
            return res.status(400).send({message: "Password is required", error: true, success: false});
        }

        const checkUser = await userModel.findOne({email: email});

        if(checkUser){
            return res.status(400).send({message: "Email Already Exist", error: true, success: false});
        }
        password = await auth.hashData(password);
        const register = await userModel.create({name, email, password});

        if(register){
            return res.status(200).send({message: "User Registered", error: false, success: true, data: register});
        }

    } catch (error) {
        return res.status(500).send({message: error?.message, error: true, success: false});
    }
}

const loginUser = async (req, res)=>{
    try {

        const {email, password} = req.body;

        if(!email){
            return res.status(400).semd({message: "Provide Email", error: true, success: false})
        }

        if(!password){
            return res.status(400).semd({message: "Provide Password", error: true, success: false})
        }

        const user = await userModel.findOne({email: email});

        if(!user){
            return res.status(400).semd({message: "Invalid Email Address", error: true, success: false})
        }

        const checkPassword = auth.checkPassword(password, user.password);

        if(!checkPassword){
            return res.status(400).send({message: "Invalid Password", error: true, success: false})
        }

        const accessToken = auth.createToken({name: user.name, email: user.email, id: user._id});

        const cookiesOption = {
            httpOnly: true,
            secure: true,
            sameSite: "None"
        }

        res.cookie("accessToken", accessToken, cookiesOption);

        return res.status(200).send({message: "Login Successfull", error: false, success: true, data: accessToken})


    } catch (error) {
        return res.status(500).send({message: error?.message, error: true, success: false});
    }
}

const forgotPassword = async (req, res)=>{
    try {
        const {email} = req.body;
        
        const user = await userModel.findOne({email: email});

        if(!user){
            return res.status(400).send({message: "User Not Found", error: true, success: false});
        }
        else{
            user.token = crypto.randomBytes(10).toString("hex");
            user.tokenExpiry = Date.now()+600000;
            await user.save();

            const transporter = nodemailer.createTransport({
                service: "Gmail",
                auth: {user: 'manigandaprabumani96271@gmail.com', pass: 'jkta zqzx gsyt dxzg'}
            });

            const mailOptions = {
                to: user.email,
                from: 'passwordreset@gmail.com',
                subject: 'Password Reset',
                text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n Please click on the following link, or paste this into your browser to complete the process:\n\n https://blogerschannel.netlify.app/reset-Password/${user.token}\n\n  If you did not request this, please ignore this email and your password will remain unchanged.\n`
            }

            transporter.sendMail(mailOptions, (err)=>{
                if(err){
                        return res.status(500).send({message: "Error Sending Mail", err})
                    }
                    else{
                        return res.status(200).send({message: "Password Reset Mail Sent", error: false, success: true})
                    }
            })
        }

    } catch (error) {
        return res.status(500).send({message: error?.message, error: true, success: false});
    }
}

const resetPassword = async (req, res) =>{
    try {
        const token = req.params.id;

        const user = await userModel.findOne({token: token, tokenExpiry: {$gt: Date.now()}});

        if(!user){
            return res.status(400).send({message: "Password reset token is invalid or expired"})
        }

        user.password = await auth.hashData(req.body.password);
        user.token = null;
        user.tokenExpiry = null;
        user.save();

        res.status(200).send({message: "Password Reset Completed", error: false, success: true});
        
    } catch (error) {
        return res.status(500).send({message: error?.message, error: true, success: false});
    }
}

const getUserDetails = async (req, res)=>{
    try {
        const id = req.headers.userId;

        if(!id){
            return res.status(400).send({message: "Provide UserId", error: true, success: false});
        }

        const user = await userModel.findOne({_id: id});

        if(!user){
            return res.status(400).send({message: "User Not Found", error: false, success: true});
        }

        return res.status(200).send({message: "User Data Fetched", error: false, success: true, data: user});

    } catch (error) {
        return res.status(500).send({message: error?.message, error: true, success: false});
    }
}

export default {
    registerUser,
    loginUser,
    forgotPassword,
    resetPassword,
    getUserDetails
}