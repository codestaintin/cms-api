import mongoose from 'mongoose';
import paginate from '../paginate/paginate';
import { IBranchModel, IBranchDoc } from './branch.interface';

const branchSchema = new mongoose.Schema<IBranchDoc, IBranchModel>(
    {
        name: {
            type: String,
            trim: true,
            required: true
        },
        address: {
            type: String,
            trim: true,
            required: true
        },
        logo: {
            type: String,
            trim: true
        },
        banner: {
            type: String,
            trim: true
        },
        createdBy: {
            required: true,
            type: mongoose.Types.ObjectId,
            ref: 'User',
        },
        organization: {
            required: true,
            type: mongoose.Types.ObjectId,
            ref: 'Organization'
        }
    }
);

branchSchema.plugin(paginate);

const Branch = mongoose.model<IBranchDoc, IBranchModel>('Branch', branchSchema);

export default Branch;