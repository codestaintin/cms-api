import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { NewCreatedUser, NewRegisteredUser, IUserDoc, UpdateUserBody } from './user.interface';
import User from './user.model';
import ApiError from '../errors/ApiError';
import { IOptions, QueryResult } from '../paginate/paginate'

export const createUser = async (userBody: NewCreatedUser): Promise<IUserDoc> => {
    if (await User.isEmailTaken(userBody.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email is already taken');
    }
    return User.create(userBody);
};

export const registerUser = async (userBody: NewCreatedUser): Promise<IUserDoc> => {
    if (await User.isEmailTaken(userBody.email)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Email is already taken');
    }
    return User.create(userBody);
};

export const queryUsers = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
    const users = await User.paginate(filter, options);
    // @ts-ignore
    return users;
};

export const getUserById = async (id: mongoose.Types.ObjectId): Promise<IUserDoc | null> => User.findById(id);

export const getUserByEmail = async (email: string): Promise<IUserDoc | null> => User.findOne({ email });

export const updateUserById = async (
    userId: mongoose.Types.ObjectId,
    updateBody: UpdateUserBody
    ): Promise<IUserDoc | null> => {
    const user = await getUserById(userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    Object.assign(user, updateBody);
    await user.save();
    return user;
};

export const deleteUserById = async (userId: mongoose.Types.ObjectId): Promise<IUserDoc | null> => {
    const user = await getUserById(userId);
    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    await user.deleteOne();
    return user;
}

