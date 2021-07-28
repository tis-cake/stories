// const TIMEOUT = 800;
// const TIMEOUT_COEFFICIENT = 4;

const onErrorShowModal = (errorStatus, errorText) => {
  const node = document.createElement('div');
  node.classList.add('error-modal');
  node.textContent = `Error status: ${errorStatus}. Error text: ${errorText}.`;

  document.body.insertAdjacentElement('afterbegin', node);

  // setTimeout(() => {
  //   node.remove();
  // }, TIMEOUT * TIMEOUT_COEFFICIENT);
};

export { onErrorShowModal };
