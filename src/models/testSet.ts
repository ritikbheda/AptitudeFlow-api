import mongoose, { Date } from 'mongoose';

interface TestsetAttrs {
  name: String;
  time_limit: Number; // in minutes
  copy_allowed: Boolean; // questions and options are allowed to copy or no
  questions: String[]; // questions array
}

// An interface that describes the properties that a Testset Model has
interface TestsetModel extends mongoose.Model<TestsetDoc> {
  build(attrs: TestsetAttrs): TestsetDoc;
}

// An interface that describes the propteries that a Testset Document has
interface TestsetDoc extends mongoose.Document {
  name: String;
  created_at: Date;
  time_limit: Number;
  copy_allowed: Boolean;
  questions: String[];
}

const testsetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  time_limit: {
    type: Number,
    required: false,
    default: 0,
  },
  copy_allowed: {
    type: Boolean,
    required: true,
    default: true,
  },
  questions: {
    type: Array<String>,
    required: false,
  },
});

testsetSchema.statics.build = (attrs: TestsetAttrs) => {
  return new Testset(attrs);
};

const Testset = mongoose.model<TestsetDoc, TestsetModel>(
  'Testset',
  testsetSchema
);

export { Testset };
