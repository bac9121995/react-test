import * as mongoose from 'mongoose';
import uuid = require('uuid');

export const TasksSchema = new mongoose.Schema({
  // Khai báo các field common
  _id: { type: String },
  createdBy: { type: String },
  createdDate: { type: Date, default: () => Date.now(), index: true }, // Đánh index
  modifiedBy: { type: String },
  modifiedDate: { type: Date, default: () => Date.now(), index: true }, // Đánh index
  id: { type: String, default: uuid.v4, index: true },
  // Khai báo các field của riêng từng chức năng
  name: { type: String },
  index: { type: Number },
  status: { type: String },
  description: { type: String },
  type: { type: String },
});

TasksSchema.pre('save', function (next) {
  this._id = this.get('id');
  next();
});
