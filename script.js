document.addEventListener("DOMContentLoaded", () => {
    const articles = [
        { title: "Welcome to Garrett's Lab", content: "This is the first article in Garrett's Lab." },
        { title: "Game Design Tips", content: "Here are some tips for aspiring game designers." }
    ];

    const articlesContainer = document.getElementById("articles");
    articles.forEach(article => {
        const articleElement = document.createElement("div");
        articleElement.classList.add("article");
        articleElement.innerHTML = `<h3>${article.title}</h3><p>${article.content}</p>`;
        articlesContainer.appendChild(articleElement);
    });

    const postForm = document.getElementById("postForm");
    const postsContainer = document.getElementById("posts");
    postForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const postContent = document.getElementById("postContent").value;
        if (postContent.trim()) {
            const postElement = document.createElement("div");
            postElement.classList.add("post");
            postElement.innerText = postContent;
            postsContainer.appendChild(postElement);
            postForm.reset();
        }
    });

    const loginForm = document.getElementById("loginForm");
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        // Implement login functionality here
        alert("Login functionality not implemented yet.");
    });
});
