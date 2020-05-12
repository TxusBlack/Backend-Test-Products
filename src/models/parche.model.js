import { Schema, model } from 'mongoose';

const schema = new Schema({
  username: Object,
  name_parche: {
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
  city: String,
  country: String,
  created_at: String,
  status: String,
  privacy: String,
});

// nameParche, description, language, gender, city, country, minAge, maxAge

const parche = new model('Parches', schema);

export default parche;
