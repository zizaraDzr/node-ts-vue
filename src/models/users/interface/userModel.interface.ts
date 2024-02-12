import { Schema, Types } from 'mongoose';

export interface IUserModels {
	email: { type: string; required: boolean; unique: boolean };
	password: { type: string; required: boolean };
	diskSpace: { type: number; default: number };
	userSpace: { type: number; default: number };
	avatar: { type: string };
	files: [{ type: Types.ObjectId; ref: string }];
}
