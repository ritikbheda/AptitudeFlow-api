import mongoose from 'mongoose';

// interface Question {
//   question: string;
//   options: string[];
//   answer: string[];
// }

interface UsertestsAttrs {
  testsetID: String;
  testQuestions: Array<object>;

  expires_at: string;
}

interface UsertestsModel extends mongoose.Model<UsertestsDoc> {
  build(attrs: UsertestsAttrs): UsertestsDoc;
}

interface UsertestsDoc extends mongoose.Document {
  testsetID: string;
  testQuestions: Array<object>;
  responses: string[];
  expires_at: string;
  result: number;
}

const usertestsSchema = new mongoose.Schema({
  testsetID: {
    type: String,
    required: true,
  },
  testQuestions: [
    {
      question: { type: String, required: true },
      options: [{ type: String, required: true }],
      answer: [{ type: String, required: true }],
    },
  ],
  responses: { type: Array<String>, default: undefined },
  expires_at: {
    type: String,
    required: true,
  },
  result: { type: Number, default: undefined },
});

usertestsSchema.statics.build = (attrs: UsertestsAttrs) => {
  return new Usertests(attrs);
};

const Usertests = mongoose.model<UsertestsDoc, UsertestsModel>(
  'Usertests',
  usertestsSchema
);

export { Usertests };
