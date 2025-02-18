import mongoose from "./index.js";
import validator from "../Utils/validator.js";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"]
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            validate: {
                validator: validator.validateEmail,
                message: props=>`${props.value} not valid`
            }
        },

        password: {
            type: String,
            required: [true, "Password is required"],
            validate: {
                validator: validator.validatePassword,
                message: props=>`${props.value} not valid`
            }
        },

        token: {
            type: String,
            default: null
        },

        tokenExpiry: {
            type: Date,
            default: null
        }
    },

    {
        collection: "Users",
        versionKey: false,
        timestamps: true
    }
)

export default mongoose.model("Users", userSchema)