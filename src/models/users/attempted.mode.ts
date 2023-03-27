import { model, Schema } from 'mongoose';

const attemptedSchema = new Schema({
  userID: {
    type: String,
  },
});

const attemptedModel = model('attempted', attemptedSchema);
export default attemptedModel;
