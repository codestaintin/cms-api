import mongoose from 'mongoose';
import { IRevenueTypeModel, IRevenueTypeDoc } from './revenue_type.interface';
import paginate from '../paginate/paginate';

const revenueTypeSchema = new mongoose.Schema<IRevenueTypeDoc, IRevenueTypeModel>(
    {
        name: {
            type: String,
            required: true,
            trim: true
        }
    }
);

revenueTypeSchema.plugin(paginate);

const RevenueType = mongoose.model<IRevenueTypeDoc, IRevenueTypeModel>('RevenueType', revenueTypeSchema);

export default RevenueType;