import { Schema, model, models } from 'mongoose';

const ProjectSchema = new Schema({
  title : {
    type: String,
    required: [true, 'Title is required.'],
  },
  imageUrl : {
    type: String,
    required: [true, 'ImageUrl is required.'],
  },
  content_short: {
    type: String,
    required: [true, 'content_short is required.'],
  },
  tag: {
    type: Array,
  }
});

const Project = models.Project || model('Project', ProjectSchema);

export default Project;