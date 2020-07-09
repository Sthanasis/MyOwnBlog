/* eslint-disable no-undef */
const createMessage = (operation, text) => {
  let color;
  if (operation !== 'success') {
    color = '#EA5770';
  } else {
    color = '#49C487';
  }
  const container = document.createElement('div');
  const innerText = document.createTextNode(text);
  container.style.backgroundColor = color;

  container.id = 'messageContainer';

  container.append(innerText);

  document.querySelector('main').appendChild(container);
};

// eslint-disable-next-line import/prefer-default-export
export { createMessage };
