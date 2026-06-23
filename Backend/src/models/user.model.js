import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true, // Automatically removes accidental leading/trailing spaces
        minlength: [2, 'Name must be at least 2 characters long'],
        maxlength: [50, 'Name cannot exceed 50 characters']
    },
    email: {
        type: String,
        required: [true, 'Email address is required'],
        unique: true,
        lowercase: true,
        trim: true,
        // Enforces a real email structure pattern right at the database layer
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
    },
    password: {
        type: String,
        // Required is omitted or evaluated dynamically because OAuth users (Google Login) won't have a password
        minlength: [6, 'Password must be at least 6 characters long'],
        // maxlength: [12, 'Password must not be greater than 12 characters'], // this will give error
        select: false // Hides the password from standard queries (e.g., User.find()) automatically
    }
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)

export default User