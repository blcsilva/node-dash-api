import { Request, Response } from 'express';

export const login = (req: Request, res: Response) => {
    res.render('login');
}

export const register = (req: Request, res: Response) => {
    res.render('register');
}

export const adminDashboard = (req: Request, res: Response) => {
   

    res.render('adminDashboard');
}