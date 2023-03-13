import { Schema, model } from 'mongoose';

/**
 * Series Schema
 */
const seriesSchema = new Schema({
  course: [String],
  slug: {
    type: String,
  },
  duration: {
    type: Number,
  },
  title: {
    type: String,
    required: true,
  },
  is_saved: {
    type: Boolean,
  },
  is_marked: {
    type: Boolean,
  },
  question_score: {
    type: String,
  },
  user_attempt_list: [String],
  sections: [
    {
      type: Schema.Types.ObjectId,
      ref: 'sections',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

const Series = model('series', seriesSchema);

export default Series;
