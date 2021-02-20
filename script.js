document.addEventListener('DOMContentLoaded', function() {

  // By default, fetch data
  fetchData()

});

// Global variable for API URL (to change once frontend is deployed and domain is linked)
const api_url = "https://adrienyoungcom-strapi-backend.herokuapp.com/projects"

function fetchData() {
  fetch(api_url).then(response => {
    if (!response.ok) {
      throw Error('ERROR');
    }
    return response.json()
  }).then(data => {

    // Map API to use in for...of loop below
    const projects = data.map(project => ({
      id: project.id,
      title: project.title,
      description: project.description,
      link: project.link,
      image: project.primaryphoto.formats.large.url,
      skills: project.skills

    }));

    for (let project in projects) {
      
      const current = projects[project];

      // Create link in #projlinks div for each project title
      const project_navlink = document.createElement("a");
      project_navlink.setAttribute("id", "project" + current.id);
      project_navlink.setAttribute("href", '#');
      project_navlink.innerHTML =`<span>${current.title}</span>`;
      document.querySelector("#projlinks").appendChild(project_navlink);

      // Display project image upon clicking link
      project_navlink.onclick = () => {
        displayImage();
        displayInfo();
      };

      // Display project image upon hovering over link
      project_navlink.onmouseover = () => {
        displayImage();
        displayInfo();
      };

      // Display project image
      function displayImage() {
        image_div = document.querySelector("#imagediv");
        image_div.innerHTML = "";
        let project_image = document.createElement("img");
        project_image.setAttribute("src", current.image);
        project_image.setAttribute("class", "primaryphoto");
        image_div.appendChild(project_image);
        console.log()
      };

      // Display project info
      function displayInfo() {
        info_div = document.querySelector("#infodiv");
        info_div.innerHTML = "";
        let project_info = document.createElement("div");
        project_info.innerHTML = `
        <h3>${current.title}</h3>
        <p>${current.description}</p>
        <a href="${current.link}">Link to Project</a>
        `
        info_div.appendChild(project_info);
        
        for (let skill in current.skills) {
          const this_skill = current.skills[skill];
          console.log(this_skill.name);

          skill_list = document.querySelector("#skillslist");
          let project_skills = document.createElement("li");
          project_skills.innerHTML = this_skill.name;
          info_div.appendChild(project_skills);
        }
      }
    }

  }).catch(error => {
    console.log(error)
  });
}



