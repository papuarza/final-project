const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RelationUserGymRateSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    gym: {
        type: Schema.Types.ObjectId,
        ref: 'Gym'
    },
    comment: String,
    rate: Number,
});

const RelationUserGymRate = mongoose.model('RelationUserGymRate', RelationUserGymRateSchema);
module.exports = RelationUserGymRate;
