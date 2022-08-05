import express from 'express';
import user from '../controllers/User.js'

const api = express.Router();

api.post('/signup', async (req, res) => {
    const {status, msg} = await user.signUp(req.body);
    res.status(status).send({msg});
});

api.post('/signin', async (req, res) => {
    const {status, msg, data} = await user.signIn(req.body);
    res.status(status).send({msg, data});
});

api.put('/update', async (req, res) => {
    const {status, msg} = await user.update(req.body);
    res.status(status).send({msg});
});

export default api;
