const getHashParam = (param) => {
  const pattern = new RegExp(`${param}=([\\w]*)`);
  return window.location.hash.match(pattern)[1];
};

const getReplacedHashParam = (param, value) => {
  const pattern = new RegExp(`${param}=([\\w]*)`);
  return window.location.hash.replace(pattern, `${param}=${value}`);
};

const changeHash = (data) => {
  const { param, value } = data;
  window.location.hash = getReplacedHashParam(param, value);
};

export {
  getHashParam,
  changeHash,
};
