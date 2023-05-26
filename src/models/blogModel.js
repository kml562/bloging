import mongoose from 'mongoose'
const objectId = mongoose.Schema.Types.ObjectId;
const { Schema, model } = mongoose;

const blogSchema = new Schema({
    title:{
        type:String,
        require:true
    },
    body:{
        type:String,
        require:true
    },
    authorId:{
        type:objectId,
        ref:"authorModel",
        require: true,
  isValid:true,
    },
    tags: [
        {
            type:String
        }
    ],
    category:{
        type:String,
        require:true
    },
    subcategory:mongoose.Schema.Types.Mixed,
    deletedAt: Date,
    isDeleted: {
        type:Boolean,
        default:false
    },
    publishedAt: Date,
    isPublished: {
        type:Boolean,
        default:false
    }
}, { timestamps: true})



const { methods } = blogSchema;
//HOOKS - saving encrypt password before save -> Pre and post lifecycle  mongoose
blogSchema.pre('save', async function(next){
    //now function will run only when password is modified
    if(!this.isModified('password')) return next
    this.password = await bcrypt.hash(this.password,10)
})


//METHODS
//Validate the password that user has given
methods.isValidatedPassword = async function(userSendPassword){
    return await bcrypt.compare(userSendPassword, this.password)
}

// create and return JWT token method
methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRY
    })
};



const blogModel = model('blogModel', blogSchema);
export default blogModel;