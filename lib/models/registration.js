const express = require('express');
const router = express.Router();


router.post('', async (req, res) => {
    
	let user = new User({
        user: req.body.user,
        email: req.body.email,
        password: req.body.psswd
    });

    if (!user.email || typeof user.email != 'string' || !checkIfEmailInString(user.email)) {
        res.status(400).json({ error: 'The field "email" must be a non-empty string, in email format' });
        return;
    }
    
	user = await user.save();
    
   
});