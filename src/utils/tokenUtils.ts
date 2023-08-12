import { v4 as uuidv4 } from 'uuid';

export const generateEmailConfirmationToken = (): string => {
  return uuidv4();
};
