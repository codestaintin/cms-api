import mongoose from 'mongoose';
import paginate from '../paginate/paginate';
import { IMeetingModel, IMeetingDoc } from './meeting.interface';

const meetingSchema = new mongoose.Schema<IMeetingDoc, IMeetingModel>(
    {
        name: {
            type: String,
            trim: true,
            required: true
        },
        date: {
            type: Date,
            required: true,
            default: Date.now
        },
        attendance: {
            type: Number,
            trim: true
        },
        anchors: [{
            type: String,
            required: true
        }],
        meetingTypeId: {
            required: true,
            type: mongoose.Types.ObjectId,
            ref: 'MeetingType'
        },
        branchId: {
            required: true,
            type: mongoose.Types.ObjectId,
            ref: 'Branch'
        },
        recordedBy: {
            required: true,
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    }
);

meetingSchema.plugin(paginate);

const Meeting = mongoose.model<IMeetingDoc, IMeetingModel>('Meeting', meetingSchema);

export default Meeting;