/* eslint-disable no-restricted-globals */
/* eslint-disable no-multi-assign */
/* eslint-disable no-undef */
import { createMessage } from './message.mjs';

const signUp = async (user) => {
  try {
    const res = await axios({
      method: 'POST',
      //dev
      //url: 'http://localhost:3000/api/v1/users',
      //prod
      url: '/api/v1/users',
      data: user,
    });
    reateMessage('success', 'Registration was a success');
    setTimeout(() => {
      location.assign('/');
    }, 1500);
    // if (res.data.status === 'success') {
    // }
  } catch (err) {
    createMessage('fail', 'Failed to register!');
  }
};

if (document.querySelector('form.gridContainer')) {
  document
    .querySelector('form.gridContainer')
    .addEventListener('submit', () => {
      const name = document.getElementById('userName').value;
      const email = document.getElementById('userEmail').value;
      const password = document.getElementById('password').value;
      const passwordConfirm = document.getElementById('passwordConfirm').value;

      const user = {
        name,
        email,
        password,
        passwordConfirm,
      };

      signUp(user);
    });
}
