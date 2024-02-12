import { Schema, model } from 'mongoose';
import { IUserModels } from '@/models/users/interface/userModel.interface';
const userSchema = new Schema<IUserModels>({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	diskSpace: { type: Number, default: 1024 * 3 * 10 },
	userSpace: { type: Number, default: 0 },
	avatar: { type: String },
	files: [{ type: Schema.Types.ObjectId, ref: 'File' }],
});

// 3. Create a Model.
export const User = model<IUserModels>('User', userSchema);
