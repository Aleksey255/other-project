const getData = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

const sendData = (url, data) => {
  return fetch(url, {
    method: 'POST',
    body: data,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

getData('db.json').then((data) => {
  let xhr = new XMLHttpRequest();

  let json = JSON.stringify(data);

  xhr.open('POST', 'https://jsonplaceholder.typicode.com/posts');

  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

  xhr.send(json);
});
