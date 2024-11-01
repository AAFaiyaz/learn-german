document.addEventListener("DOMContentLoaded", () => {
  // Check if the user is authenticated
  const token = localStorage.getItem("token");
  if (!token) {
    alert("You must be logged in to access the dashboard.");
    window.location.href = "/index.html"; // Redirect to login page
  } else {
    loadBlogPosts(); // Load blog posts if authenticated
  }

  // Add event listener for creating a new blog post
  const createBlogForm = document.getElementById("create-blog-form");
  if (createBlogForm) {
    createBlogForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const title = document.getElementById("blog-title").value;
      const content = document.getElementById("blog-content").value;

      try {
        showSpinner(); // Show loading indicator

        const response = await fetch(
          "https://learn-german-fkbb37vnb-faiyazs-projects-8a97e36c.vercel.app/api/blog",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ title, content }),
          }
        );

        hideSpinner(); // Hide loading indicator

        if (response.ok) {
          alert("Blog post created successfully!");
          createBlogForm.reset(); // Clear the form
          loadBlogPosts(); // Reload blog posts
        } else {
          alert("Failed to create blog post");
        }
      } catch (error) {
        hideSpinner(); // Hide loading indicator on error
        console.error("Error creating blog post:", error);
        alert("An error occurred. Please try again.");
      }
    });
  }
});

// Function to load blog posts
async function loadBlogPosts() {
  const token = localStorage.getItem("token");

  try {
    showSpinner(); // Show loading indicator

    const response = await fetch("http://localhost:5000/api/blog", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    hideSpinner(); // Hide loading indicator

    const blogContainer = document.getElementById("blog-container");
    blogContainer.innerHTML = ""; // Clear existing content

    if (response.ok) {
      const blogs = await response.json();
      blogs.forEach((blog) => {
        const blogElement = document.createElement("div");
        blogElement.className = "bg-white p-4 rounded shadow";
        blogElement.innerHTML = `
          <h3 class="text-lg font-bold mb-2">${blog.title}</h3>
          <p>${blog.content}</p>
        `;
        blogContainer.appendChild(blogElement);
      });
    } else {
      alert("Failed to load blog posts");
    }
  } catch (error) {
    hideSpinner(); // Hide loading indicator on error
    console.error("Error fetching blogs:", error);
    alert("An error occurred while loading blog posts.");
  }
}

// Function to log out the user
function logout() {
  localStorage.removeItem("token");
  alert("You have been logged out.");
  window.location.href = "/index.html"; // Redirect to login page
}

// Function to show a loading spinner
function showSpinner() {
  const spinner = document.createElement("div");
  spinner.className = "spinner mx-auto mt-4";
  spinner.style.border = "4px solid rgba(0, 0, 0, 0.1)";
  spinner.style.borderLeftColor = "#3498db";
  spinner.style.borderRadius = "50%";
  spinner.style.width = "40px";
  spinner.style.height = "40px";
  spinner.style.animation = "spin 1s linear infinite";
  spinner.id = "loading-spinner";

  document.body.appendChild(spinner);
}

// Function to hide the loading spinner
function hideSpinner() {
  const spinner = document.getElementById("loading-spinner");
  if (spinner) {
    spinner.remove();
  }
}

// Add CSS for spinner animation
const style = document.createElement("style");
style.innerHTML = `
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
document.head.appendChild(style);
