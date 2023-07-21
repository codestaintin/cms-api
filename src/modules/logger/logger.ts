import winston from 'winston';
import config from '../../config/config';

interface LoggerInfo {
    level: string;
    message: string;
}

const enumerateErrorFormat = winston.format((info: LoggerInfo) => {
    if (info instanceof Error) {
        Object.assign(info, { message: info.stack });
    }
    return info;
});

const logger = winston.createLogger({
    level: config.env === 'development' ? 'debug' : 'info',
    format: winston.format.combine(
        enumerateErrorFormat(),
        config.env === 'development' ? winston.format.colorize() : winston.format.uncolorize(),
        winston.format.splat(),
        winston.format.printf((info: LoggerInfo) => `${info.level}: ${info.message}`)
    ),
    transports: [
        new winston.transports.Console({
            stderrLevels: ['error'],
        }),
    ],
});

export default logger;
