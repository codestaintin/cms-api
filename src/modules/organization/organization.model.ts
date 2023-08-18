import mongoose from 'mongoose';
import paginate from '../paginate/paginate';
import { IOrganizationModel, IOrganizationDoc } from './organization.interface';

const organizationSchema = new mongoose.Schema<IOrganizationDoc, IOrganizationModel>(
    {
       name: {
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
            trim: true,
        },
        createdBy: {
            required: true,
            type: mongoose.Types.ObjectId,
            ref: 'User',
        }
    }
);

organizationSchema.plugin(paginate)

organizationSchema.method('isNameMatch', async function(name: string): Promise<boolean>{
    return true;
});

const Organization = mongoose.model<IOrganizationDoc, IOrganizationModel>('Organization', organizationSchema);

export default Organization;