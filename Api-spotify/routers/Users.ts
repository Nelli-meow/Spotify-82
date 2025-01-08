import express from 'express';
import User from '../models/User';
import {Error} from 'mongoose';

const UsersRouter = express.Router();

UsersRouter.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (error) {
        res.status(400).send({error: 'An error occurred'});
    }
});

UsersRouter.post('/', async (req, res) => {

    try {
        const user = new User({
            username: req.body.username,
            password: req.body.password
        });

        await user.save();
        res.send(user);

    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
    }
});

export default UsersRouter;