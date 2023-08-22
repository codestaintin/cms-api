import { Document, Model } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export interface IExpenses {
    amount: Number,
    purpose: string,
    date: Date,
    receivedBy: string,
    branchId: any,
    recordedBy: any
}

export interface IExpensesDoc extends IExpenses, Document {}

export type UpdateExpensesBody = Partial<IExpenses>;

export interface IExpensesModel extends Model<IExpenses> {
    paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
};
