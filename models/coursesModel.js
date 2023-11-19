import mongoose, { Schema } from 'mongoose';

const CourseSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true, 
    }, 
    teachers: {
        type: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
        required: true,
    },
    groups: {
        type: String,
        // type: [
        //     {
        //         type: Schema.Types.ObjectId,
        //         ref: 'Group'
        //     }
        // ],
        required: true,
    },
    
}, {
    timestamps: true, //date of cteate or update
});

export default mongoose.model('Course', CourseSchema);