import mongoose from 'mongoose';

interface CompanyAttrs {
  testIDs: Array<string>;
  users: Array<string>;
  // paymentsDone: Array<string>;
  // planSelected: string;
  // invoices: Array<string>;
}

interface CompanyModel extends mongoose.Model<CompanyDoc> {
  build(attrs: CompanyAttrs): CompanyDoc;
}

interface CompanyDoc extends mongoose.Document {
  testIDs: Array<string>;
  users: Array<string>;
}

const companySchema = new mongoose.Schema({
  testIDs: { type: Array<string> },
  users: { type: Array<string> },
});

companySchema.statics.build = (attrs: CompanyAttrs) => {
  return new Company(attrs);
};

const Company = mongoose.model<CompanyDoc, CompanyModel>(
  'company',
  companySchema
);

export { Company };
