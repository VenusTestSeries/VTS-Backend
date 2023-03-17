import { model, Schema } from 'mongoose';

const sectionSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
  },
  questionsCount: {
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
      image: String,
      hindi: {
        question: String,
        options: [
          {
            value: String,
            correct: Boolean,
            image: String,
          },
        ],
        solution: {
          type: String,
          image: String,
        },
      },
      english: {
        question: String,
        image: String,
        options: [
          {
            value: String,
            correct: Boolean,
            image: String,
          },
        ],
        solution: {
          type: String,
          image: String,
        },
      },
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

// const Series = model('series', seriesSchema);
const Sections = model('sections', sectionSchema);
// const Questions = model('questions', questionSchema);
/**
 * Series → Sections → Questions
 */
export default Sections;
