import mongoose from 'mongoose';

//define schema
const NotesSchema = new mongoose.Schema({
    user_email: String,
    body: String,
   
});

export default new mongoose.model('Note',NotesSchema);