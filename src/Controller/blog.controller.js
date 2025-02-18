import blogModel from "../Model/blog.model.js";

const createBlog = async (req, res)=>{
    try {
        const {title, description, image, content} = req.body;
        const id = req.headers.userId;

        if(!id){
            return res.status(400).send({message: "Provide Creator Id", error: true, success: false});
        }
        if(!title){
            return res.status(400).send({message: "Provide Title", error: true, success: false});
        }
        if(!description){
            return res.status(400).send({message: "Provide Description", error: true, success: false});
        }
        if(!image){
            return res.status(400).send({message: "Provide Image", error: true, success: false});
        }
        if(!content){
            return res.status(400).send({message: "Provide Content", error: true, success: false});
        }

        const blog = await blogModel.create({creator: id, title: title, description: description, image: image, content: content});

        if(blog){
            return res.status(200).send({message: "Blog Created", error: false, success: true, data: blog});
        }


    } catch (error) {
        return res.status(500).send({message: error?.message, error: true, success: false});
    }
}

const getAllBlogs = async (req, res)=>{
    try {

        const allBlogs = await blogModel.find().sort({createdAt: -1}).populate("creator");

        if(allBlogs.length){
            return res.status(200).send({message: "Blogs Fetched", error: false, success: true, data: allBlogs});
        }

    } catch (error) {
        return res.status(500).send({message: error?.message, error: true, success: false});
    }
}

const getMyBlogs = async (req, res)=>{
    try {
        const id = req.headers.userId;
        console.log("User Id: ", id);
        const myBlogs = await blogModel.find({creator: id}).sort({createdAt: -1});

        return res.status(200).send({message: "Blogs Fetched", error: false, success: true, data: myBlogs});
        
    } catch (error) {
        return res.status(500).send({message: error?.message, error: true, success: false});
    }
}

const getBlogById = async (req, res) =>{
    try {
        const id = req.params.id;

        if(!id){
            return res.status(400).send({message: "Provide Blog Id", error: true, success: false});
        }

        const blog = await blogModel.findOne({_id: id});

        if(blog){
            return res.status(200).send({message: "Blog Details Fetched", error: false, success: true, data: blog});
        }
    } catch (error) {
        return res.status(500).send({message: error?.message, error: true, success: false});
    }
}

const updateBlog = async (req, res) =>{
    try {

        const {_id, title, image, description, content} = req.body;
        
        let blogId = _id;

        if(!blogId){
            return res.status(400).send({message: "Provide BlogId", error: true, success: false});
        }
        
        
        const blog = await blogModel.findById(blogId);

        if(title)blog.title = title;
        if(description)blog.description = description;
        if(image)blog.image = image;
        if(content)blog.content = content;

        await blog.save();

        return res.status(200).send({message: "Blog Updated", error: false, success: true});

    } catch (error) {
        console.log(error)
        return res.status(500).send({message: error.message, error: true, success: false});
    }
}

const deleteBlog = async (req, res) =>{
    try {
        const blogId = req.params.id;

        if(!blogId){
            return res.status(400).send({message: "Provide BlogId", error: true, success: false});
        }

        const deleted = await blogModel.deleteOne({_id: blogId});

        if(deleted.deletedCount = 1){
            return res.status(200).send({message: "Blog Deleted", error: false, success: true,})
        }
    } catch (error) {
        return res.status(500).send({message: error?.message, error: true, success: false});
    }
}

export default {
    createBlog,
    getAllBlogs,
    getMyBlogs,
    updateBlog,
    deleteBlog,
    getBlogById
}