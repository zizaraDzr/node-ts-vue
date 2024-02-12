// import { AuthGuard } from './../common/auth.guard';
// import { IConfigService } from './../config/config.service.interface';
// import { ValidateMiddleware } from './../common/validate.middleware';
// import { HTTPError } from './../errors/http-error.class';
// import { UserService } from './users.service';
// import { UserRegisterDto } from './dto/user-register.dto';
// import { UserLoginDto } from './dto/user-login.dto';
// import { LoggerService } from './../logger/logger.service';
// import { TYPES } from '../types';
import { BaseController } from '@/common/controller/base.controller';
import { IUserController } from '@/users/controller/interface/user.interface.controller';
import { LoggerService } from '@/logger/logger.service';

import { IUserModels } from '@/models/users/interface/userModel.interface';
import { User } from '@/models/users/models/userModels.service';

import { NextFunction, Request, Response } from 'express';
// import { inject, injectable } from 'inversify';

// import { Ilogger } from '../logger/logger.interface';
// import { IUserService } from './users.service.interface';
// import 'reflect-metadata';
import { sign } from 'jsonwebtoken';
// @injectable()
export class UserController extends BaseController implements IUserController {
	constructor(logger: LoggerService) {
		// @inject(TYPES.ConfigService) private configServie: IConfigService, // @inject(TYPES.UserService) private userService: IUserService, // @inject(TYPES.Ilogger) private loggerService: Ilogger,
		super(logger);
		// logger.info('init UserController');

		this.bindRoutes([
			{
				path: '/login',
				method: 'post',
				func: this.login,
				// middleware: [new ValidateMiddleware(UserLoginDto)],
			},
			// {
			// 	path: '/register',
			// 	method: 'post',
			// 	func: this.register,
			// 	middleware: [new ValidateMiddleware(UserRegisterDto)],
			// },
			// {
			// 	path: '/info',
			// 	method: 'get',
			// 	func: this.info,
			// 	middleware: [new AuthGuard()],
			// },
		]);
	}

	async login(req: Request<{}, {}, IUserModels>, res: Response, next: NextFunction): Promise<void> {
		console.log(req.body); // const result = await this.userService.validateUser(req.body);
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		// const jwt = await this.signJwt(req.body.email, this.configServie.get('SECRET'));

		// if (!result) {
		// 	return next(new HTTPError(401, 'Пользователь не найден', 'login'));
		// }
		this.status200(res, { mes: user });
	}

	// async register(
	// 	{ body }: Request<{}, {}, UserRegisterDto>,
	// 	res: Response,
	// 	next: NextFunction,
	// ): Promise<void> {
	// 	const result = await this.userService.createUser(body);
	// 	console.log(result);
	// 	if (!result) {
	// 		return next(new HTTPError(422, 'Такой пользователь уже существует'));
	// 	}
	// 	this.ok(res, { email: result.email, id: result.id });
	// }
	// async info(
	// 	{ user }: Request<{}, {}, UserRegisterDto>,
	// 	res: Response,
	// 	next: NextFunction,
	// ): Promise<void> {
	// 	const userInfo = await this.userService.getUserInfo(user);
	// 	this.ok(res, { email: userInfo?.email, id: userInfo?.id });
	// }

	// private signJwt(email: string, secret: string): Promise<string> {
	// 	return new Promise<string>((resolve, reject) => {
	// 		sign(
	// 			{
	// 				email,
	// 				iat: Math.floor(Date.now() / 1000),
	// 			},
	// 			secret,
	// 			{
	// 				algorithm: 'HS256',
	// 			},
	// 			(err, token) => {
	// 				if (err) {
	// 					reject(err);
	// 				}
	// 				resolve(token as string);
	// 			},
	// 		);
	// 	});
	// }
}
