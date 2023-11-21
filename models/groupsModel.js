import mongoose, { Schema } from 'mongoose';

const GroupSchema = new mongoose.Schema({
    groupName: {
        type: String, 
        required: true, 
    },
     studentsNumber: {
        type: Number, 
         required: true, 
        default: 0,
    },
});

export default mongoose.model('Group', GroupSchema);