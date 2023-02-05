import { model, Schema } from 'mongoose';

const questionsSchema = new Schema({
  type: {
    type: String,
  },
  english: {
    value: String,
    options: [
      {
        prompt: String,
        value: String,
      },
    ],
  },
  hindi: {
    value: String,
    options: [
      {
        prompt: String,
        value: String,
      },
    ],
  },
});

const questionsModel = model('questions', questionsSchema);
export default questionsModel;
