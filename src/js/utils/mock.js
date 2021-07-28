const getRandomIntInclusive = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getMock = (options) => {
  const {
    spliceStart = 0,
    spliceEnd,
    randomIntStart,
    randomIntEnd,
    category,
    data,
  } = options;

  return data
    .splice(spliceStart, spliceEnd)
    .map((el) => {
      el.valueText = `${getRandomIntInclusive(randomIntStart, randomIntEnd)} ${category}`;
      return el;
    })
    .sort((a, b) => parseInt(b.valueText, 10) - parseInt(a.valueText, 10));
};

const getMockMostCommits = (users) => {
  const options = {
    spliceEnd: 5,
    randomIntStart: 2000,
    randomIntEnd: 4000,
    category: 'lines',
    data: users,
  };

  return getMock(options);
};

const getMockMostVotes = (users) => {
  const options = {
    spliceEnd: 15,
    randomIntStart: 5,
    randomIntEnd: 30,
    category: 'votes',
    data: users,
  };

  return getMock(options);
};

const getMockBiggestCommit = (users) => {
  const options = {
    spliceEnd: 5,
    randomIntStart: 20,
    randomIntEnd: 40,
    category: 'commits',
    data: users,
  };

  return getMock(options);
};

export {
  getMockMostVotes,
  getMockMostCommits,
  getMockBiggestCommit,
};
