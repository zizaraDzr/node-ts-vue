import mongoose, { Mongoose } from 'mongoose';
import { LoggerService } from '@/logger/logger.service';
import { ConfigService } from '@/config/service/config.service';
export class MongoService {
	client: Mongoose;
	logger: LoggerService;
	configService: ConfigService;
	constructor() {
		this.client = mongoose;
		this.logger = new LoggerService();
		this.configService = new ConfigService();
	}
	async connect(): Promise<void> {
		const dbUrl = this.configService.get('dbURL');
		try {
			await this.client.connect(dbUrl);
			this.logger.info('mongodb подключен');
		} catch (error) {
			if (error instanceof Error) {
				this.logger.error('mongodb ошибка подлючения' + error.message);
			}
		}
	}
	async disconnect(): Promise<void> {
		await this.client.disconnect();
	}
}
