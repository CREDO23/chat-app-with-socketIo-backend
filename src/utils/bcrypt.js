import * as bcrypt from 'bcrypt';

export const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    try {
      const salt = bcrypt.genSaltSync(25);

      const result = bcrypt.hashSync(password, salt);

      if (result) {
        resolve(result);
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const comparePassword = (password, secret) => {
  return new Promise((resolve, reject) => {
    try {
      const result = bcrypt.compareSync(password, secret);

      if (result) {
        resolve(result);
      }
    } catch (error) {
      reject(error);
    }
  });
};
