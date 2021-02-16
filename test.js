// Script to test my API

const api_projects = "https://adrienyoungcom-strapi-backend.herokuapp.com/projects"
const api_url = "https://adrienyoungcom-strapi-backend.herokuapp.com"

function fetchData() {
  fetch(api_projects).then(response => {
    if (!response.ok) {
      throw Error('ERROR');
    }
    return response.json()
  }).then(data => {
    const html = data.map(project => {
      return `<p>${project.title}</p>
      <p>${api_url + project.primaryphoto.url}</p>
      <img src="${api_url + project.primaryphoto.formats.medium.url}">`
    }).join('')
    document
      .querySelector('#app')
      .insertAdjacentHTML('afterbegin', '<h2>Projects:</h2>' + html)
  }).catch(error => {
    console.log(error)
  });
}

fetchData();

