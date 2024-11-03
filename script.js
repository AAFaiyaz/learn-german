document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  if (token) {
    // Optionally, check token validity (e.g., by sending a request to a protected endpoint)
    window.location.href = "/dashboard.html"; // Redirect to dashboard if already logged in
  }

  const loginForm = document.getElementById("login-form");
  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent form from submitting normally

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      // login is not working
      try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem("token", data.token);
          alert("Login successful!");
          window.location.href = "/dashboard.html"; // Redirect to dashboard
        } else {
          alert(data.message || "Login failed. Please check your credentials.");
        }
      } catch (error) {
        console.error("Error logging in:", error);
        alert("An error occurred. Please try again.");
      }
    });
  }
});

// Function to load blog posts
async function loadBlogPosts() {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("You must be logged in to view blog posts.");
    window.location.href = "/index.html"; // Redirect to login page
    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/blog", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

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
    console.error("Error fetching blogs:", error);
    console.log("error checked here");
    alert("An error occurred while loading blog posts.");
  }
}

// Call the function to load blog posts on page load if on the dashboard page
if (window.location.pathname === "/dashboard.html") {
  loadBlogPosts();
}
