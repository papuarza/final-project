'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gymSchema = new Schema({
  username: String,
  name: String,
  password: String,
  adrress: String,
  position: {
    longitud: Number,
    latitud: Number
  },
  city: String,
  country: String,
  email: String,
  description: String,
  schedule: Object,
  price: Number,
  isWifi: Boolean,
  isParking: Boolean,
  isSpa: Boolean,
  isPool: Boolean,
  isTRX: Boolean,
  isPersonalTraining: Boolean,
  isCrossfit: Boolean,
  isSpinning: Boolean,
  isBasketballCourt: Boolean,
  isSoccerCourt: Boolean,
  isTenisCourt: Boolean,
  isPaddleCourt: Boolean,
  otherClasses: String,
  imgUrl     : { type: Array, default: ["https://placeholdit.imgix.net/~text?txtsize=33&txt=250%C3%97250&w=250&h=250"] }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Gym = mongoose.model("Gym", gymSchema);
module.exports = Gym;
