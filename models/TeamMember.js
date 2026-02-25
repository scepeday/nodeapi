const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },
    role: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('TeamMember', teamMemberSchema);
