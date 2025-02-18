import mongoose from "./index.js";

const blogSchema = new mongoose.Schema(
    {
        creator: {
            type: mongoose.Schema.ObjectId,
            ref: "Users",
            required: [true, "Creator Id required"]
        },

        title: {
            type: String,
            required: [true, "Title is required"]
        },

        image: {
            type: String,
            required: [true, "image is required"]
        },

        description: {
            type: String,
            required: [true, "description is required"]
        },

        content: {
            type: String,
            required: [true, "Content is required"]
        }

    },

    {
        collection: "Blogs",
        versionKey: false,
        timestamps: true
    }
)

export default mongoose.model("Blogs", blogSchema);