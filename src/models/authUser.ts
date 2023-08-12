import mongoose from 'mongoose';

interface AuthUserAttrs {
  email: string;
  name: string;
  password: string;
  role: string;
  isEmailConfirmed: boolean;
  emailConfirmationToken: string;
  companyID: string;
}

interface AuthUserModel extends mongoose.Model<AuthUserDoc> {
  build(attrs: AuthUserAttrs): AuthUserDoc;
}

interface AuthUserDoc extends mongoose.Document {
  email: string;
  name: string;
  password: string;
  role: string;
  isEmailConfirmed: boolean;
  emailConfirmationToken: string;
  companyID: string;
}

const authUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    reuqired: true,
    enum: ['company', 'user'],
  },
  companyID: {
    type: String,
  },
  isEmailConfirmed: {
    type: Boolean,
    default: false,
  },
  emailConfirmationToken: {
    type: String,
  },
});

authUserSchema.statics.build = (attrs: AuthUserAttrs) => {
  return new AuthUser(attrs);
};

const AuthUser = mongoose.model<AuthUserDoc, AuthUserModel>(
  'authUser',
  authUserSchema
);

export { AuthUser };
