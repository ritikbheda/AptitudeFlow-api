import mongoose from 'mongoose';

interface QuestionAttrs {
  question: String;
  options: String[];
  answer: String[];
  testset_id: String;
}

interface QuestionModel extends mongoose.Model<QuestionDoc> {
  build(attrs: QuestionAttrs): QuestionDoc;
}

interface QuestionDoc extends mongoose.Document {
  question: String;
  options: String[];
  answer: String[];
  created_at: Date;
  testset_id: String;
}

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date,
    required: true,
  },
  options: {
    type: Array<String>,
    required: true,
  },
  answer: {
    type: Array<String>,
    required: true,
  },
  testset_id: {
    type: String,
  },
});

questionSchema.statics.build = (attrs: QuestionAttrs) => {
  return new Question(attrs);
};

const Question = mongoose.model<QuestionDoc, QuestionModel>(
  'question',
  questionSchema
);

export { Question };
