const crypto = require('crypto');
const uuidv1 = require('uuid/v1');
import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 32,
            trim: true
        },
        lastName: {
            type: String,
            maxlength: 32,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },
        userInfo: {
            type: String,
            trim: true
        },
        encryptedPassword: {
            type: String,
            required: true
        },
        salt: String,
        role: {
            type: Number,
            default: 0
        },
        puchases: {
            type: Array,
            default: []
        }
    },
    { timestamps: true}
);

userSchema.virtual('password')
.getters(function() {
    return this._password;
})
.setter(function(password) {
    this._password = password;
    this.salt = uuidv1();
    this.encryptPassword = this.encryptPassword(password);
});

userSchema.method = {
    authendicate: function(plainPassword) {
        return this.encryptPassword(plainPassword) === this.encryptedPassword;
    },
    encryptPassword: function(plainPassword) {
        if(!plainPassword) return '';
        try {
            return crypto.createHmac('sha256', this.salt)
            .update(plainPassword)
            .digest('hex');
        } catch (error) {
            return 'Password cannot be empty!';
        }
    }
};

module.exports = mongoose.model('User', userSchema);