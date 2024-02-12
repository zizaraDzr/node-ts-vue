import { IConfigService } from '@/config/interface/config.service.interface';
import { config, DotenvConfigOutput, DotenvParseOutput } from 'dotenv';
// import { inject, injectable } from 'inversify';
import { Ilogger } from '@/logger/interface/logger.interface';
// import { TYPES } from '../types';
// @injectable()
export class ConfigService implements IConfigService {
	private config: DotenvParseOutput;
	private logger: Ilogger;
	constructor() {
		const result: DotenvConfigOutput = config();
		if (result.error) {
			this.logger.error('Не удалось прочитать файл .env');
		} else {
			this.config = result.parsed as DotenvParseOutput;
		}
	}
	get(key: string): string {
		return this.config[key];
	}
}
