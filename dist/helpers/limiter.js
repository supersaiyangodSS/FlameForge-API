import rateLimit from "express-rate-limit";
import * as requestIp from 'request-ip';
export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 80,
    message: "Too many requests, please try again later.",
    keyGenerator: (req) => {
        return requestIp.getClientIp(req) || 'unknown';
    }
});
export const apiLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 1000,
    message: "Too many requests, please try again later.",
    keyGenerator: (req) => {
        return requestIp.getClientIp(req) || 'unknown';
    }
});
export const formLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 8,
    message: "Too many requests, please try again later.",
    keyGenerator: (req) => {
        return requestIp.getClientIp(req) || 'unknown';
    }
});
export const imageUploadLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 30,
    message: "Too many requests please try again later.",
    keyGenerator: (req) => {
        return requestIp.getClientIp(req) || 'unknown';
    }
});
//# sourceMappingURL=limiter.js.map