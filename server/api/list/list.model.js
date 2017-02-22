'use strict';

const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({ 
  title: {
    type: String,
    require: true
  },
  position: {
    type: Number,
    default: 0
  }
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

module.exports = mongoose.model('List', listSchema);  