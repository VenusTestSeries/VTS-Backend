import { model, Schema } from 'mongoose';

const seriesSchema: Schema = new Schema({
  uid: {
    type: Schema.Types.ObjectId,
    max: 4,
  },
  slug: {
    type: String,
  },
  time: {
    type: String,
    timestamp: true,
  },
  title: {
    type: String,
    required: true,
  },
  is_saved: {
    type: String,
  },
  is_marked: {
    type: String,
  },
  question_score: {
    type: String,
  },
  user_attempt_list: [String],
  marks: {
    positive: Number,
    negative: Number,
  },
  questions: [
    {
      type: {
        type: String,
      },
      QSNo: Number,
      SSNo: Number,
      SSSNo: Number,
      hindi: {
        question: String,
        options: [
          {
            prompt: String,
            value: String,
          },
        ],
      },
      english: {
        question: String,
        options: [
          {
            prompt: String,
            value: String,
          },
        ],
      },
    },
  ],
});

const testSeriesModel = model('series', seriesSchema);
export default testSeriesModel;
