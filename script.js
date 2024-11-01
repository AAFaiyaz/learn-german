document.addEventListener("DOMContentLoaded", () => {
  // Simulated blog data
  const blogPosts = [
    {
      title: "Understanding JavaScript Basics",
      content:
        "Learn the fundamentals of JavaScript to get started with web development.",
    },
    {
      title: "Introduction to Tailwind CSS",
      content:
        "Discover how to use Tailwind CSS for building fast and responsive UIs.",
    },
    {
      title: "HTML & CSS Tips for Beginners",
      content: "Essential tips to make your first website look great.",
    },
  ];

  // Populate the blog section dynamically
  const blogContainer = document.getElementById("blog-container");
  blogPosts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.className = "bg-white p-4 rounded shadow";
    postElement.innerHTML = `
            <h3 class="text-lg font-bold mb-2">${post.title}</h3>
            <p>${post.content}</p>
        `;
    blogContainer.appendChild(postElement);
  });

  // Login form handling
  const loginForm = document.getElementById("login-form");
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Basic validation (add backend validation for production use)
    if (username && password) {
      alert(`Welcome, ${username}!`);
      // Implement login logic here (e.g., call a backend API)
    } else {
      alert("Please enter both username and password.");
    }
  });
});
