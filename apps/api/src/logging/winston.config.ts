import * as winston from 'winston';
import { WinstonModuleOptions } from 'nest-winston';

export const winstonConfig: WinstonModuleOptions = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        process.env.NODE_ENV === 'production'
          ? winston.format.json()
          : winston.format.combine(
              winston.format.colorize({ all: true }),
              winston.format.printf(({ level, message, timestamp, context, ms }) => {
                return `${timestamp as string} ${level} [${context as string ?? 'App'}] ${message as string} ${ms as string}`;
              }),
            ),
      ),
    }),
    ...(process.env.NODE_ENV === 'production'
      ? [
          new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
          }),
          new winston.transports.File({
            filename: 'logs/combined.log',
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
          }),
        ]
      : []),
  ],
};
