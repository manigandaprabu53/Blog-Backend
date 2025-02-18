import config from "./config.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createToken = (payload) =>{
    const token = jwt.sign(payload, config.JWT_SECRET, {expiresIn: config.JWT_EXPIRY});
    return token;
}

const hashData = async (str)=>{
    let salt = await bcrypt.genSalt(Number(config.SALT));
    let hash = await bcrypt.hash(str, salt);
    return hash;
}

const checkPassword = async (str, hash) =>{
    const status = await bcrypt.compare(str, hash);
    return status;
}

const decodeToken = async (token)=>{
    return jwt.decode(token);
}

export default {
    createToken,
    hashData,
    checkPassword,
    decodeToken
}