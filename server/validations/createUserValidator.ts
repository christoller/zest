const User = require('../models/userSchema')

const userCreateValidator = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const allowedFields = ['username', 'password', 'email'];
    
    if (
        Object.keys(req.body).filter((field) => !allowedFields.includes(field))
            .length >= 1
    ) {
        return res.status(400).json({
            message: 'Only username, password and email fields allowed.',
        });
    }
    if (!username || !password) {
        return res.status(422).json({
            message: 'Please provide a username and a password.',
        });
    }
    if (username.length < 4) {
        
        return res.status(422).json({
            message: 'Username must be at least 4 characters.',
        });
    }
    if (username.length > 30) {
        return res.status(422).json({
            message: 'Username cannot exceed 30 characters.',
        });
    }
    if (password.length < 8) {
        return res.status(422).json({
            message: 'Password must be at least 8 characters.',
        });
    }
    if (!password.match(/[a-z]+/)) {
        return res.status(422).json({
            message: 'Password must contain a lower case letter.',
        });
    }
    if (!password.match(/[A-Z]+/)) {
        return res.status(422).json({
            message: 'Password must contain an upper case letter.',
        });
    }
    if (!password.match(/[!@#$%^&*()~<>\[\]\\\/?{}'";:,.=+|_-`]+/)) {
        return res.status(422).json({
            message: 'Password must contain a special character.',
        });
    }
    if (!password.match(/[0-9]+/)) {
        return res.status(422).json({
            message: 'Password must contain a number.',
        });
    }
    // AWAIT SOLUTION TO ASYNC ISSUE
    if (await User.findOne({username: username})) {
        return res.status(422).json({
            message: 'That username is already taken.',
        });
    }
    if (await User.findOne({email: email})) {
        return res.status(422).json({
            message: 'That email is already taken.',
        });
    }
    next();
};

export default userCreateValidator
