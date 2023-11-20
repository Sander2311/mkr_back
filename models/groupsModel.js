import mongoose, { Schema } from 'mongoose';

const GroupSchema = new mongoose.Schema({
    groupName: {
        type: String, 
        required: true, 
    },
});

export default mongoose.model('Group', GroupSchema);