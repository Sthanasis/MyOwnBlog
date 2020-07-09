/* eslint-disable no-restricted-globals */
/* eslint-disable no-multi-assign */
/* eslint-disable no-undef */
import { createMessage } from './message.mjs';

const singUp = document.querySelector('form.gridContainer');

const signUp = async (data) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '`http://localhost:3000/api/v1/users`',
      data,
    });

    if (res.data.status === 'success') {
      createMessage('success', 'Registration was successfull!');
      setTimeout(() => {
        location.assign('/');
      }, 2000);
    }
  } catch (err) {
    createMessage(
      'failed',
      `Registration Failed. Check your info and try again!`
    );
    setTimeout(() => {
      document.getElementById('messageContainer').remove();
    }, 5000);
  }
};

// const sendData = async (url, data, method) => {
//   try {
//     const res = await fetch(url, {
//       method: method,
//       mode: 'cors',
//       cache: 'no-cache',
//       credentials: 'same-origin',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       redirect: 'follow',
//       referrerPolicy: 'no-referrer',
//       body: JSON.stringify(data),
//     });
//     document.getElementById('userName').value = '';
//     document.getElementById('userEmail').value = '';
//     password = document.getElementById('password').value = '';
//     passwordConfirm = document.getElementById('passwordConfirm').value = '';
//     document.getElementById('messageContainer').remove();
//     createMessage('Success', 'Your Account has been Created');
//     return res.json();
//   } catch (err) {
//     console.log(err);
//     alert('Something went Wrong!!');
//   }
// };

const gatherUserData = () => {
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

  if (Object.keys(user).length !== 0) signUp(user);
};

singUp.addEventListener('submit', gatherUserData);
