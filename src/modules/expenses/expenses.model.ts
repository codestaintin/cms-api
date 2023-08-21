import mongoose from 'mongoose';
import paginate from '../paginate/paginate';
import { IExpensesDoc, IExpensesModel } from './expenses.interface';

const expensesSchema = new mongoose.Schema<IExpensesDoc, IExpensesModel>(
    {
        amount: {
            type: Number,
            required: true
        },
        date: {
            type: Date,
            required: true,
            default: Date.now
        },
        receivedBy: {
            type: String,
            required: true,
            trim: true
        },
        branchId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Branch'
        },
        recordedBy: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'User'
        }
    }
);

expensesSchema.plugin(paginate);

const Expenses = mongoose.model<IExpensesDoc, IExpensesModel>('Expenses', expensesSchema);

export default Expenses;
