import mongoose from 'mongoose';
import { IRevenueModel, IRevenueDoc } from './revenue.interface';
import paginate from '../paginate/paginate';

const revenueSchema = new mongoose.Schema<IRevenueDoc, IRevenueModel>(
    {
        amount: {
            type: Number,
            trim: true,
            required: true
        },
        revenueSource: {
            type: String,
            trim: true,
            required: true
        },
        date: {
            type: Date,
            required: true,
            default: Date.now
        },
        branchId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Branch'
        },
        revenueTypeId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'RevenueType'
        },
        recordedBy: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    }
);

revenueSchema.plugin(paginate);

const Revenue = mongoose.model<IRevenueDoc, IRevenueModel>('Revenue', revenueSchema);

export default Revenue;
