const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please add a name"]
    },
    email: {
        type: String,
        required: [true, "Please add a email"],
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email"
        ]

    },
    password: {
        type: String,
        required: [true, "Please add a password"],
        minLength: [6, "password must be up to 6 characters"],
        //maxLength: [23, "password must not be more than 23 characters"]
    },
    photo: {
        type: String,
        required: [true, "Please add a photo"],
        default: "https://th.bing.com/th?id=OIP.w2McZSq-EYWxh02iSvC3xwHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.1&pid=3.1&rm=2"
    },
    phone: {
        type: String,
        default: "+91"
    },
    bio: {
        type: String,
        maxLength: [250, "Bio must not be more than 250 characters"],
        default: "bio"
    }

}, {
    timestamps: true,
}
);

 //encrypt password to db

  userSchema.pre("save", async function(next) {
     if(!this.isModified("password"))
     {
           return next()
     }

    //hash paasword
    const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(this.password, salt);
   this.password = hashedPassword;
   next();

  })
 
const User = mongoose.model("User", userSchema);
module.exports = User;