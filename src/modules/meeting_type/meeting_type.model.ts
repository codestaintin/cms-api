import mongoose from 'mongoose';
import { IMeetingTypeModel, IMeetingTypeDoc } from './meeting_type.interface';
import paginate from '../paginate/paginate';

const meetingTypeSchema = new mongoose.Schema<IMeetingTypeDoc, IMeetingTypeModel>(
    {
        name: {
            type: String,
            required: true,
            trim: true
        }
    }
);

meetingTypeSchema.plugin(paginate);

const MeetingType = mongoose.model<IMeetingTypeDoc, IMeetingTypeModel>('MeetingType', meetingTypeSchema);

export default MeetingType;