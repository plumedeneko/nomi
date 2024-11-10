import express from 'express';
import { Login, validatePass } from './models.js';
import bcrypt from 'bcrypt';
import Joi from "joi";

const usersRouter = express.Router();

usersRouter.post("/register", async (req, res) => {
    try {
        const { error } = validatePass(req.body);
        if (error)
            return res.status(400).send({message: error.details[0].message});
        const user = await Login.findOne({username: req.body.username});
        if (user)
            return res.status(409).send({message: "Username already exists!"});
        
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);
    
        await new Login({...req.body, password: hashPassword}).save();
        res.status(201).send({message: "User created successfully"});
    } catch(error) {
        res.status(500).send({message: "Internal Server Error"});
    }
})

usersRouter.post("/login", async (req, res) => {
    try {
        const { error } = validateLogin(req.body);
        if (error)
            return res.status(400).send({message: error.details[0].message})

        const user = await Login.findOne({username: req.body.username});
        if (!user)
            return res.status(400).send({message: "Invalid Email or Password"});

        const validPassword = await bcrypt.compare( 
            req.body.password, user.password
        )

        if (!validPassword)
            return res.status(401).send({message: "Invalid Email or Password"});

        const token = user.generateAuthToken();
        res.status(200).send({token: token, message: "Logged in successfully"});

    } catch(error) {
        console.log(error);
        res.status(500).send({message: "Internal Server Error"});
    }
})

const validateLogin = (data) => {
    const schema = Joi.object({
        username: Joi.string().required().label("username"),
        password: Joi.string().required().label("password")
    });
    return schema.validate(data);
}

export default usersRouter;
