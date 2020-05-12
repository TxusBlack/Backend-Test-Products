import { Schema, model } from 'mongoose';

const schema = new Schema({
  username: Object,
  title: {
    type: String,
    required: true,
  },
  media: [{
    type: String,
    url: String
  }],
  description: {
    type: String,
    required: true,
  },
  users: Array,
  admins: Array,
  language: String,
  gender: String,
  minAge: Number,
  maxAge: Number,
  quote_person: Number,
  direction: String,
  code_promotional: String,
  number_invites: Number,
  created_at: String,
  status: String,
  privacy: String,
  parche: String,
  assistants: Array,
  pending: Array,
  past: Array,
});

const plan = new model('Plan', schema);

export default plan;
