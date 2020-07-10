/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
import { createMessage } from './message.mjs';

const postArticle = async (data) => {
  try {
    const res = await axios({
      method: 'POST',
      //dev
      //url: 'http://localhost:3000/api/v1/articles',
      //prod
      url: '/api/v1/articles',
      data,
    });

    if (res.data.status === 'success') {
      createMessage('success', 'Success!');
      setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    createMessage('failed', 'Failed to create Article!');
    setTimeout(() => {
      document.getElementById('messageContainer').remove();
    }, 3000);
  }
};

const patchArticle = async (data) => {
  try {
    const res = await axios({
      method: 'PATCH',
      //dev
      // url: `http://localhost:3000/api/v1/articles/${
      //   document.querySelector('.articleId').value
      // }`,
      //prod
      url: `/api/v1/articles/${document.querySelector('.articleId').value}`,
      data,
    });

    if (res.data.status === 'success') {
      createMessage('success', 'Your article has been edited successfully!');
      setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    createMessage(
      'failed',
      'Something went wrong while editing your article. Please try again.'
    );
    setTimeout(() => {
      document.getElementById('messageContainer').remove();
    }, 3000);
  }
};

const deleteArticle = async () => {
  try {
    const res = await axios({
      method: 'DELETE',
      //dev
      // url: `http://localhost:3000/api/v1/articles/${
      //   document.querySelector('.articleId').value
      // }`,

      //prod
      url: `/api/v1/articles/${document.querySelector('.articleId').value}`,
    });

    if (res.status === 204) {
      createMessage('success', 'Your article has been deleted');
      setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    console.log(err);
  }
};

if (document.getElementById('deleteArticle')) {
  document.getElementById('deleteArticle').addEventListener('click', () => {
    // eslint-disable-next-line no-alert
    const flag = confirm('Are you sure you want to delete this Article?');
    if (flag) deleteArticle();
  });
}

if (document.getElementById('create')) {
  document.getElementById('create').addEventListener('click', () => {
    const title = document.querySelector('input.title').value;
    const content = document.getElementById('articleContent').value;
    const author = document.querySelector('#signContainer .username').innerHTML;
    const data = {
      title,
      content,
      author,
    };

    postArticle(data);
  });
}

if (document.getElementById('edit')) {
  document.getElementById('edit').addEventListener('click', () => {
    const title = document.querySelector('input.title').value;
    const content = document.getElementById('articleContent').value;
    const author = document.querySelector('#signContainer .username').innerHTML;
    const data = {
      title,
      content,
      author,
    };

    patchArticle(data);
  });
}
