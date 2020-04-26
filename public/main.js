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
};
