document.addEventListener('DOMContentLoaded', () => {
  // Navbar toggle functionality
  const toggleButton = document.querySelector('.navbar-toggle');
  const navbarMenu = document.querySelector('.navbar-menu');
  const closeButton = document.querySelector('.navbar-close');
  
  toggleButton.addEventListener('click', (e) => {
      e.stopPropagation();
      navbarMenu.classList.toggle('active');
  });

  closeButton.addEventListener('click', () => {
      navbarMenu.classList.remove('active');
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
      if (!navbarMenu.contains(e.target) && !toggleButton.contains(e.target)) {
          navbarMenu.classList.remove('active');
      }
  });

  // Contact popup functionality
  const contactButton = document.querySelector('.contact-btn');
  const contactPopup = document.getElementById('contactPopup');
  const contactClose = document.querySelector('.contact-close');

  contactButton.addEventListener('click', () => {
      contactPopup.style.display = 'flex';
  });

  contactClose.addEventListener('click', () => {
      contactPopup.style.display = 'none';
  });

  contactPopup.addEventListener('click', (e) => {
      if (e.target === contactPopup) {
          contactPopup.style.display = 'none';
      }
  });
});

// Your existing contributors fetch code
const REPO_OWNER = "kanak227";
const REPO_NAME = "NGO-WEBSITE";
const GITHUB_TOKEN = "";

async function fetchContributors() {
  const contributorsContainer = document.getElementById("contributors");

  try {
      const response = await fetch(
          `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contributors?per_page=100`,
          {
              headers: GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {},
          }
      );

      if (!response.ok) throw new Error("Failed to fetch contributors");

      const contributors = await response.json();

      contributors.forEach((contributor) => {
          const card = document.createElement("div");
          card.className = "contributor-card";

          const img = document.createElement("img");
          img.src = contributor.avatar_url;
          img.alt = contributor.login;

          const name = document.createElement("h3");
          name.textContent = contributor.login;

          const githubLink = document.createElement("a");
          githubLink.href = contributor.html_url;
          githubLink.target = "_blank";
          githubLink.rel = "noopener noreferrer";
          githubLink.className = "github-link";
          
          const githubIcon = document.createElement("i");
          githubIcon.classList.add("fab", "fa-github");
          
          githubLink.setAttribute("title", "Visit GitHub Profile");
          githubLink.setAttribute("aria-label", "Visit GitHub Profile");
          githubLink.appendChild(githubIcon);

          const contentDiv = document.createElement("div");
          contentDiv.appendChild(name);
          contentDiv.appendChild(githubLink);

          card.appendChild(img);
          card.appendChild(contentDiv);

          contributorsContainer.appendChild(card);
      });
  } catch (error) {
      console.error("Error fetching contributors:", error);
      const errorMessage = document.createElement("p");
      errorMessage.textContent = "Failed to load contributors. Please try again.";
      contributorsContainer.appendChild(errorMessage);
  }
}

fetchContributors();