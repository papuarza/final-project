const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RelationUserGymSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    gym: {
        type: Schema.Types.ObjectId,
        ref: 'Gym'
    },
    Voucher: String,
    used: Boolean,
    rated: Boolean,
});

const RelationUserGym = mongoose.model('RelationUserGym', RelationUserGymSchema);
module.exports = RelationUserGym;
