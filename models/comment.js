import { Schema, model, models } from 'mongoose';

const CommentSchema = new Schema({
  user_id : {
    type: Number,
    required: [true, 'user id is required.'],
  },
  user_name : {
    type: String,
    required: [true, 'user id is required.'],
  },
  project_id : {
    type: String,
    required: false,
  },
  content: {
    type: String,
    required: [true, 'content is required.'],
  }
});

const Comment = models.Comment || model('Comment', CommentSchema);

export default Comment;