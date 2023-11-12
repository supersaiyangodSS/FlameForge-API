import winston, {format, transports} from "winston";

const logger = winston.createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.File({
            filename: 'logs/index.log',
            level: 'info'
        }),
        new transports.File({
            filename: 'logs/download.log',
            level: 'info'
        })
    ]
});

export default logger;