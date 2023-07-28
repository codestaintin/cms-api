import mongoose, { Model, Document } from 'mongoose';
import { QueryResult } from '../paginate/paginate';
import { AccessAndRefreshTokens } from '../token/token.interfaces';

export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface IUserDoc extends IUser, Document {
    isPasswordMatch(password: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUserDoc> {
    isEmailTaken(email: string, excludeUserId?: mongoose.Types.ObjectId): Promise<boolean>;
    paginate(filter: Record<string, any>, options: Record<string, any>): Promise<boolean>;
}

export type UpdateUserBody = Partial<IUser>;
export type NewCreatedUser = IUser;

export interface IUserWithTokens {
    user: IUserDoc;
    tokens: AccessAndRefreshTokens;
}