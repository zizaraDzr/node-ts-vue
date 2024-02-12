import express, { Express } from 'express';
import { Server } from 'node:http';
import { json } from 'body-parser';
import { LoggerService } from '@/logger/logger.service';
import { UserController } from '@/users/controller/user.controller';
import { MongoService } from '@/database/mongo.service';
import { ConfigService } from '@/config/service/config.service';
export class App {
	app: Express;
	port: string;
	server: Server;
	logger: LoggerService;
	userController: UserController;
	mongoService: MongoService;
	configService: ConfigService;

	constructor(
		logger: LoggerService,
		userController: UserController,
		configService: ConfigService,
		mongoService: MongoService,
	) {
		this.app = express();
		this.app.use(json());

		this.port = configService.get('serverPort');
		this.logger = logger;
		this.userController = userController;
		this.mongoService = mongoService;
	}
	useRoutes(): void {
		this.app.use('/user', this.userController.router);
	}
	useExeptionFilter(): void {
		this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
	}

	public async init(): Promise<void> {
		this.useRoutes();
		await this.mongoService.connect();
		this.server = this.app.listen(this.port);
		this.logger.info(`сервер запущен localhost:${this.port}`);
	}
}
