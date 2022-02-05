const crypto = require('crypto');
const uuid = require('uuid').v4
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
    {
        firstName: {
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
            type: String,
            default: 'User'
        },
        purchases: {
            type: Array,
            default: []
        }
    },
    { timestamps: true}
);

userSchema.virtual('password')
.get(function() {
    return this._password;
})
.set(function(password) {
    this._password = password;
    this.salt = uuid();
    this.encryptedPassword = this.encryptPassword(password);
});

userSchema.methods = {
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