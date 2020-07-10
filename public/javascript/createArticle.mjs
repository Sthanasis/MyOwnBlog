/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
import { createMessage } from './message.mjs';

const postArticle = async (data) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/articles',
      data,
    });

    if (res.data.status === 'success') {
      createMessage('success', 'You have Posted A new Article');
      setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    createMessage('failed', `Your article has failed to be posted. Try again!`);
    setTimeout(() => {
      document.getElementById('messageContainer').remove();
    }, 3000);
  }
};

if (document.getElementById('create')) {
  document.getElementById('create').addEventListener('click', () => {
    const title = document.querySelector('input.title').value;
    const content = document.getElementById('articleContent').value;
    const author = document.querySelector('.username').innerHTML;

    const data = {
      title,
      content,
      author,
    };

    postArticle(data);
  });
}
