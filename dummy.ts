const newTestSeries = new TestSeries({
  name: 'Maths Test Series',
  subject: 'Maths',
  date: new Date(),
  duration: 60,
  questions: [
    {
      text: 'What is the square root of 64?',
      options: ['4', '6', '8', '10'],
      correctAnswerIndex: 2,
    },
    {
      text: 'What is the value of pi?',
      options: ['3.14', '3.141', '3.1415', '3.14159'],
      correctAnswerIndex: 3,
    },
    {
      text: 'What is the area of a circle with radius 5?',
      options: ['10', '25', '50', '78.5'],
      correctAnswerIndex: 3,
    },
  ],
});

const UserAnswerSchema = new mongoose.Schema({
  userId: String,
  testSeriesId: String,
  answers: [
    {
      questionIndex: Number,
      selectedAnswerIndex: Number,
    },
  ],
});
