const mongoose = require('mongoose');
const passport = require('passport');
const _ = require('lodash');
const {
    update,
    toNumber
} = require('lodash');
const {
    use
} = require('../routes/index.router');
const e = require('express');
const multer = require('multer');
var DIR = './uploads/';
var upload = multer({
    dest: DIR
}).single('photo');
const User = mongoose.model('User');
ObjectId = require('mongodb').ObjectID;


module.exports.addEmployee = (req, res, next) => {
    var user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.dob = req.body.DOB;
    user.hobbies.push(req.body.hobbies);
    user.employeeType = req.body.employeeType;
    user.image = req.body.image
    user.save((err, doc) => {
        if (!err) {
            res.send(doc);
        } else {
            if (err.code == 11000)
                res.status(422).send(['Duplicate email adrress found.']);
            else
                return next(err);
        }

    });
}

module.exports.updateEmpDetails = (req, res, next) => {
    User.findByIdAndUpdate(req.body._id, req.body, function (err, update) {
        if (!update)
            return res.status(202).json({
                status: false,
                message: 'User record not found.'
            });
        else
            return res.status(200).json({
                status: true,
                update
            });
    });
}
module.exports.getEmpList = (req, res, next) => {
    User.find({}, function (err, results) {
        if (!results)
            return res.status(202).json({
                status: false,
                message: 'Users not found.'
            });
        else
            return res.status(200).json({
                status: true,
                results
            });
    });
}
module.exports.searchEmp = (req, res, next) => {
    User.find({
        email: req.body.searchValue
    }, function (err, results) {
        if (!results)
            return res.status(202).json({
                status: false,
                message: 'Users not found.'
            });
        else
            return res.status(200).json({
                status: true,
                results
            });
    });
}
module.exports.deleteEmp = (req, res, next) => {
    User.findByIdAndRemove(req.body._id, (err, todo) => {
        if (err) return res.status(500).send(err);
        return res.status(200).send('Deleted Successfully');
    });

}
module.exports.profileUpload = (req, res, next) => {
    var path = '';
    upload(req, res, function (err) {
        if (err) {
            // An error occurred when uploading
            console.log(err);
            return res.status(422).send("an Error occured")
        }
        // No error occured.
        path = req.file.path;
        return res.send(path);
    });
}
module.exports.retriveImage = (req, res, next) => {
    User.find({
        _id: req.body._id
    }, function (err, results) {
        if (!results)
            return res.status(202).json({
                status: false,
                message: 'Users not found.'
            });
        else {
            const filePath = 'F:/My-Job-Portfolio/job-project/server/"+ results.image'
            res.sendFile(filePath);
        }

    });

}
