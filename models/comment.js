import { Schema, model, models } from 'mongoose';

const CommentSchema = new Schema({
  user_id : {
    type: String,
    required: [true, 'user id is required.'],
  },
  project_id : {
    type: Number,
    required: false,
  },
  content: {
    type: String,
    required: [true, 'content is required.'],
  },
  created_at : {
    type: Date,
    required: true
  }
});

const Comment = models.Comment || model('Comment', CommentSchema);

export default Comment;