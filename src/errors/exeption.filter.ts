// import { inject, injectable } from 'inversify';
import { Request, NextFunction, Response } from 'express';
import { IExeptionFilter } from './exeptioin.filter.interface';
import { HTTPError } from './http-error.class';
import { LoggerService } from '@/logger/logger.service';
// import { TYPES } from '../types';
// import 'reflect-metadata';

// @injectable()
export class ExeptionFilter implements IExeptionFilter {
	logger: LoggerService;
	constructor(
		logger: LoggerService,
		// @inject(TYPES.Ilogger) private logger: Ilogger
	) {
		this.logger = logger;
		logger.info('init ExeptionFilter');
	}
	catch(err: Error | HTTPError, req: Request, res: Response, next: NextFunction): void {
		if (err instanceof HTTPError) {
			this.logger.error(`${err.context} Ошибка:${err.statusCode} - ${err.message}`);
			res.status(err.statusCode).send({ err: err.message });
		} else {
			this.logger.error(`${err.message}`);
			res.status(500).send({ err: err.message });
		}
	}
}
