const pool = require('../db')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController{

    async getUsers(req, res) {
        const users = await pool.query('select * from users')
        res.json(users.rows)
    }
    
    async signUp(req, res){
        const {email, password} = req.body;
        try {
            //hashing password
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)

            //creating token
            const token = jwt.sign({email}, 'secret', {expiresIn: '1h'})
            // creating user
            const user = await pool.query('insert into users (email, password) values ($1, $2)', [email, hashedPassword])
            res.json({email, token}) 
        } catch (error) {
            res.json(error)
        }
    }

    async logIn(req, res) {
        const {email, password} = req.body;
        try {
            //finding user by email address
            const user = await pool.query('select * from users where email = $1', [email])

            // if user doesnt exists
            if (!user.rows[0]){
                res.json({message: 'User doesnt exist'})
            } else {
            //matching passwords
            const passwordMatch = await bcrypt.compare(password, user.rows[0].password)
            const token = jwt.sign({email}, 'secret', {expiresIn: '1h'})

            // if match - sending token to response, then will set cookie from this token in response
            if (passwordMatch){
                res.json({ email, token });
            }
        }
        } catch (error) {
            res.send(error)
        }
    
    }
}


module.exports = new UserController;