import {createMessage} from './message.mjs'

const singUp = document.querySelector('form.gridContainer');

const gatherUserData = () => {
  let name = document.getElementById('userName').value;
  let email = document.getElementById('userEmail').value;
  let password = document.getElementById('password').value;
  let passwordConfirm = document.getElementById('passwordConfirm').value;

  const user = {
    name,
    email,
    password,
    passwordConfirm
  }
  
  if(Object.keys(user).length !== 0)
    sendData(`http://localhost:3000/api/v1/users`, user , 'POST')
    .then(()=>{
      setTimeout(()=>{
        createMessage('Success','Your Account has been Created');
        document.getElementById('userName').value = '';
        document.getElementById('userEmail').value = '';
        password = document.getElementById('password').value = '';
        passwordConfirm = document.getElementById('passwordConfirm').value = '';
        document.getElementById('messageContainer').remove();
      },2000)
    }).catch(err => {
      setTimeout(()=>{
        createMessage('fail','something went wrong. Check your info and try again')
        document.getElementById('messageContainer').remove();
      },2000)
    })
}

// SEND DATA TO API without using AXIOS - method specifies the request (post or patch) 
const sendData = async (url, data, method) => {
  try{
    const res = await fetch(url, {
      method: method,
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(data),
    });
    return res.json();
  }catch(err){
    console.log(err)
  }
};

singUp.addEventListener('submit', gatherUserData)
