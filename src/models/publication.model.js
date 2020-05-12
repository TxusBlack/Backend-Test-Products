import { Schema, model } from 'mongoose';

const schema = new Schema({
  username: Object,
  destiny: {
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
  feeling: String,
  tags: Array,
  date: Number,
  lat: String,
  lng: String,
  reactions: Array,
  comments: Array,
  parcheId: String
});

const publication = new model('Publication', schema);

export default publication;
