// eslint-disable-next-line @typescript-eslint/no-var-requires
const ObjectId = require('mongoose').Types.ObjectId;

export const checkValidMongoId = async (id) => {
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
