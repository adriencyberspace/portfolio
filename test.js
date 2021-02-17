// Script to test my API

const api_url = "https://adrienyoungcom-strapi-backend.herokuapp.com/projects"


function fetchData() {
  fetch(api_url).then(response => {
    if (!response.ok) {
      throw Error('ERROR');
    }
    return response.json()
  }).then(data => {
    const html = data.map(project => {

      return `<p>${project.title}</p>
      <p>${project.primaryphoto.url}</p>
      <img src="${project.primaryphoto.formats.medium.url}">`
      
    }).join('')
    document
      .querySelector('#app')
      .insertAdjacentHTML('afterbegin', '<h2>Projects:</h2>' + html)
  }).catch(error => {
    console.log(error)
  });
}

fetchData();

