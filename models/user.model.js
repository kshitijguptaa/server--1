const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: 'first name can\'t be empty'
    },
    lastName: {
        type: String,
        required: 'first name can\'t be empty'
    },
    email: {
        type: String,
        required: 'Email can\'t be empty',
        unique: true
    },
    dob: {
        type: String,
        required: 'dob can\'t be empty'
    },
    hobbies: {
        type: Array,
        required: 'hobbies can\'t be empty'
    },
    employeeType: {
        type: String,
        required: 'employeeType can\'t be empty'
    },
    image: {
        type: String,
        
    }
});

// Custom validation for email
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

mongoose.model('User', userSchema);