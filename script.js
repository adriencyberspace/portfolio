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
        displayImage(current.image);
        displayInfo(current);
      };

      // Display project image upon hovering over link
      project_navlink.onmouseover = () => {
        displayImage(current.image);
        displayInfo(current);
      };

      let adrien = document.querySelector('#adrien');
      let about = document.querySelector('#about');

      adrien.onclick = () => {
        homePage()
      }

      adrien.onmouseover = () => {
        homePage()
      }

      about.onclick = () => {
        homePage()
      }

      about.onmouseover = () => {
        homePage()
      }

      function homePage() {
        document.querySelector('#arrowbar').style.display = 'none';
        let selfieURL = 'https://res.cloudinary.com/sk8rb0i/image/upload/v1617760126/portfolio-me_gv6uwi.jpg';
        document.querySelector('#titlediv').innerHTML = '';
        document.querySelector('#skilldiv').innerHTML = '';
        document.querySelector('#linkdiv').style.display = 'none';
        document.querySelector('#homepagelinkdiv').style.display = 'flex';
        let selfDescription = `
        <span>Hello!</span> <span>I'm Adrien Young, a Rock N Roll musician turned full stack web developer. I built the frontend of this site with Vanilla Javascript and the backend with a Headless CMS. I'm interested in civic tech, art, music and 3D rendering.</span> <span>Let's work together.</span>
        `;
        document.querySelector("#descriptiondivwide").innerHTML = selfDescription;
        document.querySelector("#descriptiondivnarrow").innerHTML = selfDescription;
        
        document.querySelector("#descriptiondivnarrow");
        displayImage(selfieURL);
      }

      // Mobile view - show first project upon clicking WORK, then navigate forward and backward with arrows
      document.querySelector('#work').onclick = () => {
        document.querySelector('#arrowbar').style.display = 'flex';
        let y = 0;
        displayImage(projects[y].image);
        displayInfo(projects[y]);

        function showNext() {
          y += 1;
          if (y >= projects.length) {
            y = 0;
          } 
          displayImage(projects[y].image);
          displayInfo(projects[y]);
        }

        function showPrev() {
          y -= 1;
          if (y < 0) {
            y = projects.length - 1;
          } 
          displayImage(projects[y].image);
          displayInfo(projects[y]);
        }
        
        document.querySelector('#rightarrow').onclick = () => {
          showNext();
        }

        document.querySelector('#leftarrow').onclick = () => {
          showPrev();
        }

        // Begin swipe functionality:
        let touchstartX = 0;
        let touchendX = 0;

        const gestureZone = document.getElementById('contentcontainer');

        gestureZone.addEventListener('touchstart', function(event) {
            touchstartX = event.changedTouches[0].screenX;
        }, false);

        gestureZone.addEventListener('touchend', function(event) {
            touchendX = event.changedTouches[0].screenX;
            handleGesture();
        }, false); 

        function handleGesture() {
            if (touchendX < touchstartX) {
                console.log('Swiped left');
                showNext();
            }
            
            if (touchendX > touchstartX) {
                console.log('Swiped right');
                showPrev();
            }
        }
      }

      // Display project image
      function displayImage(x) {
        image_div = document.querySelector("#imagediv");
        image_div.innerHTML = "";
        let project_image = document.createElement("img");
        project_image.setAttribute("src", x);
        project_image.setAttribute("class", "primaryphoto");
        image_div.appendChild(project_image);
        console.log()
      };

      // Display project info
      function displayInfo(x) {
        title_div = document.querySelector("#titlediv");
        title_div.innerHTML = "";
        let project_title = document.createElement("h1");
        project_title.innerHTML = `${x.title}`;
        title_div.appendChild(project_title);

        // Display project description (hacky but works)
        // Need narrow and wide to keep rotated divs in place
        let project_desc_wide = document.createElement("p");
        project_desc_wide.innerHTML = `${x.description}`;
        desc_div_wide = document.querySelector("#descriptiondivwide");
        desc_div_wide.innerHTML = "";
        desc_div_wide.appendChild(project_desc_wide);

        let project_desc_narrow = document.createElement("p");
        project_desc_narrow.innerHTML = `${x.description}`;
        desc_div_narrow = document.querySelector("#descriptiondivnarrow");
        desc_div_narrow.innerHTML = "";
        desc_div_narrow.appendChild(project_desc_narrow);
        
        
        // Display project links
        document.querySelector('#homepagelinkdiv').style.display = 'none';
        document.querySelector('#linkdiv').style.display = 'flex';
        live_link = document.querySelector("#live-link");
        live_link.href = `${x.link}`;
        github_link = document.querySelector("#github-link");
        github_link.href = `${x.githublink}`;
        if (x.githublink == null) {
          github_link.style.display = "none";
          live_link.style.display = "block";
          live_link.style.margin = "auto";
        } else if (x.link == null) {
          live_link.style.display = "none";
          github_link.style.display = "block";
          github_link.style.margin = "auto";
        } else if (x.githublink == null && x.link == null) {
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
        for (let skill in x.skills) {
          const this_skill = x.skills[skill];
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

// Up and Down Scroll Function for Rotated #Projbar Div.
(function() {
  function scrollHorizontally(e) {
      e = window.event || e;
      var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
      document.getElementById('projbar').scrollLeft -= (delta*15); // Multiplied by 15
      e.preventDefault();
  }
  if (document.getElementById('projbar').addEventListener) {
      // IE9, Chrome, Safari, Opera
      document.getElementById('projbar').addEventListener("mousewheel", scrollHorizontally, false);
      // Firefox
      document.getElementById('projbar').addEventListener("DOMMouseScroll", scrollHorizontally, false);
  } else {
      // IE 6/7/8
      document.getElementById('projbar').attachEvent("onmousewheel", scrollHorizontally);
  }
})();


