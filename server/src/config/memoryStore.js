const users = new Map();

export const memoryStore = {
  users,

  addUser(user) {
    users.set(user.email, user);
    return user;
  },

  getUserByEmail(email) {
    return users.get(email);
  },

  getUserById(id) {
    for (const user of users.values()) {
      if (user._id?.toString() === id.toString()) {
        return user;
      }
    }

    return null;
  },

  updateUser(email, updatedUser) {
    users.set(email, updatedUser);
    return updatedUser;
  }
};

export default memoryStore;