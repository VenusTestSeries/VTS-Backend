import { model, Schema } from 'mongoose';

/**
 * Question Schema
 */
// const questionSchema: Schema = new Schema({
//   type: {
//     type: String,
//   },
//   QSNo: Number,
//   SSNo: Number,
//   SSSNo: Number,
//   hindi: {
//     question: String,
//     options: [
//       {
//         prompt: String,
//         value: String,
//       },
//     ],
//   },
//   english: {
//     question: String,
//     options: [
//       {
//         prompt: String,
//         value: String,
//       },
//     ],
//   },
// });
/**
 * Section Schema
 */
const sectionSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  questionsCount: {
    type: Number,
  },
  time: {
    type: Number,
  },
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

/**
 * Series Schema
 */
const seriesSchema = new Schema({
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
const Sections = model('sections', sectionSchema);
// const Questions = model('questions', questionSchema);
/**
 * Series → Sections → Questions
 */
export { Series, Sections };
