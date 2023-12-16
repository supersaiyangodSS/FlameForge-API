import rateLimit from "express-rate-limit";
import * as requestIp from 'request-ip';
import { Request } from "express";

export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 80,
    message: "Too many requests, please try again later.",
    keyGenerator : (req : Request) => {
        return requestIp.getClientIp(req) || 'unknown'
    }
});

export const formLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 8,
    message: "Too many requests, please try again later.",
    keyGenerator : (req : Request) => {
        return requestIp.getClientIp(req) || 'unknown'
    }
});

export const imageUploadLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 30,
    message: "Too many requests please try again later.",
    keyGenerator : (req: Request) => {
        return requestIp.getClientIp(req) || 'unknown'
    }
});