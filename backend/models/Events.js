const {Schema, model} = require('mongoose');

const eventSchema = Schema({
    name: {type: String, required: true, trim: true},
    date: {type: Date, required: true},
    time: {type: String, required: true},
    location: {type: String, required: true},
    description: {type: String, trim: true},
    createdBy: {type: Schema.Types.ObjectId, ref: 'User', required: true},
}, {timestamps: true});

module.exports = model('Event', eventSchema);