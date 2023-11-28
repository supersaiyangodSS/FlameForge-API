import rateLimit from "express-rate-limit";
import * as requestIp from 'request-ip';
import { Request } from "express";

export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: "Too many requests, please try again after 15 minutes",
    keyGenerator : (req : Request) => {
        return requestIp.getClientIp(req) || 'unknown'
    }
});