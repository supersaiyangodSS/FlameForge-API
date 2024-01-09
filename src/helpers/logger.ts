import winston, {format, transports, verbose} from "winston";


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
        new winston.transports.File({ filename: 'logs/api/apiCalls.log', level: 'verbose', }),
        new winston.transports.File({ filename: 'logs/api/apiErrors.log', level: 'error' })
    ],
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.printf(info => {
            const ip = info.ip ? ` - IP: ${info.ip}` : '';
            const method = info.method ? ` - Method ${info.method}`: '';
            const endpoint = info.endpoint ? ` - Endpoint: ${info.endpoint}` : '';
            const level = info.level ? ` - Level: ${info.level} ` : '';
            return `${info.timestamp} ${info.level} ${info.message}${ip}${method}${endpoint}${level}`
        })
    ),
});

const routeLogger = winston.createLogger({
    transports: [
        new winston.transports.File({ filename: 'logs/route/routeCalls.log', level: 'verbose', })
    ],
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.printf(info => {
            const ip = info.ip ? ` - IP: ${info.ip}` : '';
            const method = info.method ? ` - Method ${info.method}`: '';
            const endpoint = info.endpoint ? ` - Endpoint: ${info.endpoint}` : '';
            const level = info.level ? ` - Level: ${info.level} ` : '';
            return `${info.timestamp} ${info.level} ${info.message}${ip}${method}${endpoint}${level}`
        })
    ),
});

export { logger, apiLogger, routeLogger };