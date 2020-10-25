import * as bcrypt from 'bcryptjs';

import { UserProfile } from '../../shared/models/user-profile';

export function getHashedPassword(password: string): Promise<string> {
  return bcrypt.genSalt().then((salt) => {
    return bcrypt.hash(password, salt).then((hash) => {
      return hash;
    });
  });
}
