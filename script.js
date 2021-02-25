document.addEventListener('DOMContentLoaded', function() {

  // By default, fetch data
  fetchData()

});

// Global variable for API URL (to change once frontend is deployed and domain is linked)
const api_url = "https://adrienyoungcom-strapi-backend.herokuapp.com/projects";

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
      githublink: project.githublink,
      image: project.primaryphoto.url,
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
        title_div = document.querySelector("#titlediv");
        title_div.innerHTML = "";
        let project_title = document.createElement("h1");
        project_title.innerHTML = `${current.title}`;
        title_div.appendChild(project_title);

        // Display project description
        desc_div = document.querySelector("#descriptiondiv");
        desc_div.innerHTML = "";
        let project_desc = document.createElement("div");
        project_desc.innerHTML = `<p>${current.description}</p>`
        desc_div.appendChild(project_desc);
        
        // Display project links
        live_link = document.querySelector("#live-link");
        live_link.href = `${current.link}`;
        github_link = document.querySelector("#github-link");
        github_link.href = `${current.githublink}`;
        if (current.githublink == null) {
          github_link.style.display = "none";
          live_link.style.display = "block";
          live_link.style.margin = "auto";
        } else if (current.link == null) {
          live_link.style.display = "none";
          github_link.style.display = "block";
          github_link.style.margin = "auto";
        } else if (current.githublink == null && current.link == null) {
          github_link.style.display = "none";
          live_link.style.display = "none";
        } else {
          live_link.style.margin = "0";
          github_link.style.margin = "0";
          github_link.style.display = "block";
          live_link.style.display = "block";
          github_link.style.width = "48%";
          live_link.style.width = "48%";
        }




        // Display project skills
        skill_div = document.querySelector("#skilldiv");
        skill_div.innerHTML = "";
        for (let skill in current.skills) {
          const this_skill = current.skills[skill];
          let project_skills = document.createElement("span");
          project_skills.innerHTML = this_skill.name;
          skill_div.appendChild(project_skills);
        }
      }
    }

  }).catch(error => {
    console.log(error)
  });
}



