import "express-session";

declare module "express-session" {
    interface SessionData {
        user: string,
        role: string,
        uid: string,
    }
}