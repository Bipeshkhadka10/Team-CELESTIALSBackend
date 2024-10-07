import mongoose from 'mongoose';

// User schema
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    registrationNumber: {
        type: String,
        required: true,
        unique: true,
    },
    userImage: {
        type: String,
        default: '',
    },
    isAdmin: {
        type: Boolean,
        default: false,  // Regular user by default
    }
}, {
    timestamps: true,  // Automatically adds createdAt and updatedAt fields
});

  userSchema.pre('save',async function(next){
            if(!this.isModified('password'))  return next();    // checks the password is modified or not for each signup/login and allow for changed password only
            const getsalt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(this.password,getsalt);
            this.password = hashedPassword
            return next();
            
        });

export default mongoose.model('User', userSchema);
