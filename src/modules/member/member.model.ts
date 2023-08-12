import mongoose from 'mongoose';
import validator from 'validator';
import paginate from '../paginate/paginate';
import { IMemberModel, IMemberDoc, maritalStatus } from './member.interface';

const memberSchema = new mongoose.Schema<IMemberDoc, IMemberModel>(
    {
        title: {
            type: String,
            trim: true
        },
        firstName: {
            type: String,
            trim: true,
            required: true
        },
        middleName: {
            type: String,
            trim: true,
            required: true
        },
        lastName: {
            type: String,
            trim: true,
            required: true
        },
        gender: {
            type: String,
            trim: true,
            enum: ['M', 'Male', 'F', 'Female'],
            required: true
        },
        dob: {
            type: Date,
            default: Date.now
        },
        address: {
            type: String,
            trim: true,
            required: true
        },
        occupation: {
            type: String,
            trim: true,
            required: true
        },
        status: {
            type: String,
            trim: true,
            required: true
        },
        mobile: {
            type: String,
            trim: true,
            required: true
        },
        email: {
            type: String,
            unique: true,
            trim: true,
            lowercase: true,
            validate(value: string) {
                if (!validator.isEmail(value)) {
                    throw new Error('Invalid email');
                }
            },
        },
        maritalStatus: {
            type: String,
            enum: Object.values(maritalStatus),
            default: maritalStatus.single,
            required: true
        },
        branchId: {
            required: true,
            type: mongoose.Types.ObjectId,
            ref: 'Organization'
        }
    }
);

memberSchema.plugin(paginate);

const Member = mongoose.model<IMemberDoc, IMemberModel>('Member', memberSchema);
export default Member;