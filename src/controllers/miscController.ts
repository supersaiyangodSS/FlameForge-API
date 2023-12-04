import { Request, Response } from "express";
import Report from '../models/reportModel';
import { logger } from '../helpers/logger.js';

const reportPage = (req: Request, res: Response) => {
    res.render('report', {
        title: 'Report'
    })
}


export { reportPage };