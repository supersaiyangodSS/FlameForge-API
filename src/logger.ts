import winston, {format, transports} from "winston";


const logger = winston.createLogger({
    // level: 'info',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.File({
            filename: 'logs/request.log',
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
            filename: 'logs/verbose.log',
            level: 'verbose'
        }),
        new transports.File({
            filename: 'logs/silly.log',
            level: 'silly'
        })
    ]
});

export default logger;