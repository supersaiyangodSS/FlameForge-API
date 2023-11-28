import rateLimit from "express-rate-limit";

export const limit = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    message: "Too many requests, please try again after 15 minutes",
    keyGenerator: (req) => req.ip
});

export const downloadLimit = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 3,
    message: "Too many attempts, please try again after 15 minutes"
});
 
export const limiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 5,
    message: "Too many requests, Please try again after 15 minutes",
    keyGenerator: (req) => req.ip
});