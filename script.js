document.addEventListener('DOMContentLoaded', function() {

  // Fetch data, by default
  fetchData()

});

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
      
      var current = projects[project];

      // Create links for each project in the #projbar then add to the #projlinks div
      var project_navlink = document.createElement("a");
      project_navlink.setAttribute("id", "project" + current.id);
      project_navlink.setAttribute("href", '#');
      project_navlink.innerHTML =`${current.title}`;
      
      document.querySelector("#projlinks").appendChild(project_navlink);

      // TEST: Upon click, display the current title, not the last title. Not working.
      project_navlink.onclick = () => alert(current.title);

      // Move onto this once I figure out above:
      // document.querySelector(project_navlink).addEventListener('mouseover', () => {
      //   let project_image = document.createElement("img");
      //   project_image.setAttribute("src", current.primaryphoto.url);
      //   project_image.setAttribute("class", "primaryphoto");

      //   document.querySelector("#imagediv").appendChild(project_image);
      // });
      
      // document.querySelector(project_navlink).addEventListener('mouseover', () => document.querySelector("#imagediv").appendChild(project_image));

    }

  }).catch(error => {
    console.log(error)
  });
}

// fetchData();

