const getDashboard = async (req: Request, res: Response) => {
    const locals = {
        title: 'Dashboard',
        desc: 'TEMP'
    }
    res.render('dashboard')
}

import { Request, Response } from "express";

export { getDashboard };