import blogModels from '../models/blogModel.js'
import { isValidObjectId } from 'mongoose'

export const createBlog = async function(req, res){
    try {
        let blogData = req.body
        let authorId = blogData.authorId
        
            if(!authorId || authorId == ""){
                return res.status(400).send({ status:false, msg: " Please provide authorId"})
            }
            if(!isValidObjectId(authorId)){
                return res.status(404).send({ status:false, msg:"please provide valid authorId"})
            }
            const saveData = await blogModels.create(blogData)
            res.status(201).send({ status:true, msg:saveData})
        
    } catch (error) {
        res.status(500).send({ status:false, msg: error.message})
    }
}


const getBlogs = async function(req, res){
    try{
        const getData = req.query
        const { authorId, category, tags, subcategory} = getData
        if(authorId && isValidObjectId(authorId)){
            res.status(400).send({ status:false, msg:"Invalid authorId"})
        }
        let blog = await blogModels.find({ ...getData}).populate("authorId")
        if(blog.length == 0){
            res.status(400).send({ status:false, msg: "data not found"})
        }
        res.status(201).send({ status:true, data: blog})
    }
    catch(err){
        res.send({msg: err.message})
    }
    
}

export default getBlogs
