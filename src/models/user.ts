import mongoose from 'mongoose';

interface UserAttrs {
  testsTaken: Array<string>;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attar: UserAttrs): UserDoc;
}

interface UserDoc extends mongoose.Document {
  testsTaken: Array<string>;
}

const userSchema = new mongoose.Schema({
  testsTaken: {
    type: Array<string>,
  },
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('user', userSchema);

export { User };
