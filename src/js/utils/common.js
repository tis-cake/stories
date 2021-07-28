const PAGE_DEFAULT_INDEX = 0;

const getExtraPageOptionsByIndex = (currentIndex, lastIndex) => {
  const result = {
    isFirst: false,
    isLast: false,
    isMiddle: false,
  };

  if (currentIndex === PAGE_DEFAULT_INDEX) {
    result.isFirst = true;
  }

  if (currentIndex === lastIndex) {
    result.isLast = true;
  }

  if (currentIndex !== PAGE_DEFAULT_INDEX && currentIndex !== lastIndex) {
    result.isMiddle = true;
  }

  return result;
};

const getSelectedUserIndex = (selectedUserId, users) => {
  let selectedUserIndex;

  if (selectedUserId !== null && selectedUserId !== undefined) {
    selectedUserIndex = users.findIndex((user) => user.id === selectedUserId);
  }

  return selectedUserIndex;
};

const getIntegerNumber = (string) => {
  return parseInt(string.match(/\d+/), 10);
};

export {
  getExtraPageOptionsByIndex,
  getSelectedUserIndex,
  getIntegerNumber,
};
