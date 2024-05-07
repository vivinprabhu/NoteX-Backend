const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const notesSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true
    },
    note: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    user: { type: Schema.Types.ObjectId, ref: 'user' }
})

const noteModel = mongoose.model("note", notesSchema)

module.exports = noteModel