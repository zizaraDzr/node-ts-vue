import { App } from '@/app';
import { LoggerService } from '@/logger/logger.service';
import { UserController } from '@/users/controller/user.controller';
import { ConfigService } from './config/service/config.service';
import { MongoService } from './database/mongo.service';

async function bootstrap(): Promise<void> {
	const app = new App(
		new LoggerService(),
		new UserController(new LoggerService()),
		new ConfigService(),
		new MongoService(),
	);
	await app.init();
}

bootstrap();
