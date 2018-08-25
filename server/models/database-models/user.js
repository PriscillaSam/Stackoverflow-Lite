import users from '../dummy-models/user';

let userValues = '';
const passhash = '$2b$10$./5TI8NosIOvFo6kq030rero7yvdoW9JLDSeBZezxfZ57hqxcb3UK';

const getUsers = () => {
  users.forEach((user, index) => {
    if (index === users.length - 1) {
      userValues += `('${user.name}', '${user.email}', '${passhash}')`;
    } else {
      userValues += `('${user.name}', '${user.email}', '${passhash}'),`;
    }
  });
  return userValues;
};

const seedUser = `
INSERT INTO users (name, email, passhash) VALUES ${getUsers()}`;

export default seedUser;
