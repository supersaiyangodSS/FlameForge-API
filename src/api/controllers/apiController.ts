import { Request, Response } from "express";

const getMain = async (req: Request, res: Response) => {
    try {
        res.json({ message: "Explore our API documentation on the homepage for detailed information and usage guidelines." });
    } catch (error) {
        console.log(error);
        res.json({ error: 'Internal server error!' });
    }
}

export { getMain }
