import { Schema, model } from 'mongoose';

const schema = new Schema({
  username: {
    type: String,
    required: true,
    index: { unique: true }
  },
  doc_type: {
    type: String,
    required: true,
  },
  access_token: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  number_doc: {
    type: Number,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  referral_code: {
    type: String,
    required: true,
    unique: true
  },
  referred_by_user: {
    type: String,
    default: null
  },
  referred_users: {
    type: Array,
    default: []
  },
  type_login: {
    type: String,
    required: true
  },
  type_user: {
    type: String,
    required: true
  },
  email_verified: {
    type: Boolean,
    default: false
  },
  wallet_address: String,
  wallet_private_key: String,
  friends: Array,
  avatar: String,
  invitations: Array,
  invitations_pending: Array,
  id_onesignal: String,
  userId: String,
  // created_at: Date
});

const user = new model('User', schema);

export default user;
