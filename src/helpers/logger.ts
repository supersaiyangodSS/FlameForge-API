import winston, {format, transports} from "winston";


const logger = winston.createLogger({
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.File({
            filename: 'logs/http/request.log',
            level: 'http'
        }),
        new transports.File({
            filename: 'logs/index.log',
            level: 'info'
        }),
        new transports.File({
            filename: 'logs/error/error.log',
            level: 'error'
        }),
        new transports.File({
            filename: 'logs/verbose/verbose.log',
            level: 'verbose'
        }),
        new transports.File({
            filename: 'logs/silly/silly.log',
            level: 'silly'
        })
    ]
});

const apiLogger = winston.createLogger({
    transports: [
        new winston.transports.File({ filename: 'logs/api/apiCalls.log' }),
    ],
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
});

export { logger, apiLogger };