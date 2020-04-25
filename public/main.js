let id = '';
const getData = () => {
  fetch(`http:/api/v1/articles`)
    .then((res) => {
      return res.json();
    })
    .then((response) => {
      console.log(response);
      document.getElementById('title').innerHTML =
        response.data.articles[0].title;
      document.getElementById('content').innerHTML =
        response.data.articles[0].content;
      id = response.data.articles[0]._id;
      console.log(id);
    })
    .catch((err) => {
      console.log(err);
    });
};

getData();
// console.log(id);
async function postData(url, data) {
  const res = await fetch(url, {
    method: 'PATCH',
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
}

// postData('http://localhost:3000/api/v1/users/5ea499496a41b13a3413e551', {
//   name: 'Nikolakis',
// })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

const submitButton = document.getElementById('submit');

submitButton.addEventListener('click', () => {
  postData(`http:/api/v1/articles/${id}`, {
    content: document.getElementById('textField').value,
  })
    .then((response) => {
      console.log(response);
      document.getElementById('content').innerHTML =
        response.data.article.content;
    })
    .catch((err) => {
      console.log(err);
    });
});
