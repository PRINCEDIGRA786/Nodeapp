
const express = require('express')
const User = require('../models/User')
const router = express.Router()


// ROUTE 1: Create a user using :POST "/api/auth/createuser".
router.post('/createuser',
    async (req, res) => {
        let success = false;
        try {

            let user = await User.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ error: "Sorry a user with this email  already exists" })
            }
            user = await User.create({
                name: req.body.name,
                password: req.body.password,
                email: req.body.email
            })
            success = true
            res.status(200).json({ "success": success })

        }

        catch (error) {
            console.error(error.message)
            res.status(500).send("INTERNAL SERVER ERROR")
        }
    })


// // ROUTE 2: User Details using: POST "/api/auth/getuser".
router.get('/getuser', async (req, res) => {

    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(200).json(user);
        }
        else {
            return res.status(400).json({ "Status": "Account doesn't exists" })
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//Route 3: Put request api:

router.put('/updatePassword', async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Update the password
        user.password = newPassword;
        await user.save();

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
module.exports = router