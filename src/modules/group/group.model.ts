import mongoose from 'mongoose';
import { IGroupModel, IGroupDoc } from './group.interface';
import paginate from '../paginate/paginate';

const groupSchema = new mongoose.Schema<IGroupDoc, IGroupModel>(
    {
        name: {
            type: String,
            trim: true,
            required: true
        },
        description: {
            type: String,
            trim: true,
            required: true
        },
        roles: [{
            type: String,
            required: true,
            trim: true
        }],
        members: [{
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Member'
        }],
        branchId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Branch'
        },
    }
);

groupSchema.plugin(paginate);

const Group = mongoose.model<IGroupDoc, IGroupModel>('Group', groupSchema);

export default Group;
