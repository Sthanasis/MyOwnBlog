/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
import { createMessage } from './message.mjs';

const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/users/login',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'success') {
      createMessage('success', 'Logged In Successfully!');
      setTimeout(() => {
        location.assign('/');
      }, 1500);
    }

    console.log(res);
  } catch (err) {
    console.log(err.response.data.message);
    createMessage(
      'failed',
      `Log in failed! Check if you provided the correct email and password!`
    );
    setTimeout(() => {
      document.getElementById('messageContainer').remove();
    }, 3000);
  }
};

const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://localhost:3000/api/v1/users/logout',
    });

    if (res.data.status === 'success') location.reload(true);
  } catch (err) {
    createMessage('fail', 'Error logging out. Try again!');
  }
};

if (document.querySelector('form.container.flexColumn')) {
  document
    .querySelector('form.container.flexColumn')
    .addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      login(email, password);
    });
}

if (document.getElementById('logout')) {
  document.getElementById('logout').addEventListener('click', () => {
    logout();
  });
}
