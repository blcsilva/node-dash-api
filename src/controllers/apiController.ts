import { Request, Response } from 'express';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../models/User';
import { generateToken } from '../config/passport';

dotenv.config();
export const ping = (req: Request, res: Response) => {
    res.json({pong: true});
}

export const register = async (req: Request, res: Response) => {
    if(req.body.username && req.body.password) {
        let { username, password } = req.body;

        let hasUser = await User.findOne({where: { username }});
        if(!hasUser) {
            let newUser = await User.create({ username, password });
            const token = generateToken({ id: newUser.id });
                      
            res.status(201);
            res.json({ id: newUser.id, token });
        } else {
            res.json({ error: 'E-mail já existe.' });
        }
    }

    res.json({ error: 'E-mail e/ou senha não enviados.' });
}

export const login = async (req: Request, res: Response) => {
    if(req.body.username && req.body.password) {
        let username: string = req.body.username;
        let password: string = req.body.password;

        let user = await User.findOne({ 
            where: { username, password }
            
        });

        if(user) {
            const token = generateToken({ id: user.id });
            res.json({ status: true, token });
            return;
        }
    }

    res.json({ status: false });
}

export const list = async (req: Request, res: Response) => {
    let users = await User.findAll();
    let list: string[] = [];

    for(let i in users) {
        list.push( users[i].username );
    }

    res.json({ list });
}