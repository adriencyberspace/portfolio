// Script to test my API

const api_url = "https://adrienyoungcom-strapi-backend.herokuapp.com/projects"

console.log("Works");

function fetchData() {
  fetch(api_url).then(response => {
    if (!response.ok) {
      throw Error('ERROR');
    }
    return response.json()
  }).then(projects => {
    for (let project in projects) {
      
      const current = projects[project];
      console.log(current.title);

      const project_navlink = document.createElement("a");
      project_navlink.setAttribute("id", current.id);
      project_navlink.setAttribute("href", '#');
      project_navlink.innerHTML =`${current.title}`;

      document.querySelector("#projlinks").appendChild(project_navlink);
    
    
    }
  }).catch(error => {
    console.log(error)
  });
}

fetchData();

