import { Schema, model, models } from 'mongoose';

const ProjectSchema = new Schema({
  title : {
    type: String,
    required: [true, 'Title is required.'],
  },
  content_short: {
    type: String,
    required: [true, 'content_short is required.'],
  },
  tags: {
    type: Array,
  },
  imageUrl : {
    type: String,
    default: '',
  }
});

const Project = models.Project || model('Project', ProjectSchema);

export default Project;