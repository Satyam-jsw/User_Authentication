const mongooose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const keysecret = process.env.SECRET_KEY;

const userSchema = new mongooose.Schema({
    work: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true

    },
    phone: {
        type: Number,
        required: true
    },
    messages: [
        {
            name: {
                type: String,
                required: true

            },
            email: {
                type: String,
                required: true

            },
            phone: {
                type: Number,
                required: true
            },
            message: {
                type: String,
                required: true

            }
        }
    ],
    // Date: {
    //     type: Date,
    //     Default: Date.now
    // },

    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
    verifytoken: {
        type: String
    }
})
// to make password strong which  is saved in database

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});

//we are generating token in database

userSchema.methods.generateAuthtoken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    }
    catch (err) {
        console.log(err);
    }
}

//stored the message in database 
userSchema.methods.addMessage = async function (name, email, phone, message) {
    try {
        this.messages = this.messages.concat({ name, email, phone, message });
        await this.save();
        return this.messages;

    } catch (err) {
        console.log(err);
    }
}


//collection creation
const User = mongooose.model('users', userSchema);

module.exports = User;