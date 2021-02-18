document.addEventListener('DOMContentLoaded', function() {

  // By default, fetch data
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
  }).then(data => {

    const projects = data.map(project => ({
      id: project.id,
      title: project.title,
      image: project.primaryphoto.url
    }));

    for (let project in projects) {
      
      const current = projects[project];
      console.log(current.title);
      console.log(current.image);

      const project_navlink = document.createElement("a");
      project_navlink.setAttribute("id", "project" + current.id);
      project_navlink.setAttribute("href", '#');
      project_navlink.innerHTML =`${current.title}`;

      document.querySelector("#projlinks").appendChild(project_navlink);

      // project_navlink.onclick = () => alert(current.title);


      // Move onto this once I figure out above:
      project_navlink.onclick = () => {
        image_div = document.querySelector("#imagediv");
        image_div.innerHTML = "";
        let project_image = document.createElement("img");
        project_image.setAttribute("src", current.image);
        project_image.setAttribute("class", "primaryphoto");

        image_div.appendChild(project_image);

        

      };

      }

  }).catch(error => {
    console.log(error)
  });
}



