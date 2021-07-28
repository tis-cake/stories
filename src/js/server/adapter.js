const adaptUserToClient = (user) => {
  const {
    avatar_url: avatar,
    id,
    login,
  } = user;

  return {
    id,
    avatar,
    name: login,
    valueText: '',
  };
};

const adaptUsersToClient = (users) => users.map(adaptUserToClient);

export { adaptUsersToClient };
