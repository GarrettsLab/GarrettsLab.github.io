document.addEventListener('DOMContentLoaded', function() {
    fetchPosts();
});

function fetchPosts() {
    // Fetch posts from the 'posts' directory
    // This is a placeholder implementation
    const posts = [
        {
            title: 'First Post',
            url: '../posts/post1.html',
            date: '2024-08-01'
        },
        {
            title: 'Second Post',
            url: '../posts/post2.html',
            date: '2024-08-02'
        }
    ];

    const postsList = document.getElementById('posts-list');
    posts.forEach(post => {
        const postItem = document.createElement('div');
        postItem.className = 'post-item';
        postItem.innerHTML = `
            <h2><a href="${post.url}">${post.title}</a></h2>
            <p>${new Date(post.date).toLocaleDateString()}</p>
        `;
        postsList.appendChild(postItem);
    });
}
