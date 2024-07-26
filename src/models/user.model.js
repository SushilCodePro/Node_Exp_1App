const users = [];

export const addUser = (username, passwordHash) => {
  users.push({ username, passwordHash });
  console.log(users);
};

export const findUserByUsername = (username) => {
  return users.find(user => user.username === username);
};

export const findUserById = (id) => {
  return users[id];
};

export const getUserIndex = (username) => {
  return users.findIndex(user => user.username === username);
};
