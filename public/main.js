const singUpBtn = document.getElementById('userSignUp');


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
        document.getElementById('userName').value = '';
        document.getElementById('userEmail').value = '';
        password = document.getElementById('password').value = '';
        passwordConfirm = document.getElementById('passwordConfirm').value = '';
        alert('Your Account has been Created');
      })
      .catch(err=>{
        console.log(err);
        alert('something went wrong. Please try again')
      });
}

// get Data form an API
const getData = (url) => {
  fetch(url)
    .then((res) => {
      return res.json();
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

// SEND DATA TO API - method specifies the request (post or patch)
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
    alert('something went wrong. Please try again')
  }
};

//singUpBtn.addEventListener('click', gatherUserData())
