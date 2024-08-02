document.addEventListener('DOMContentLoaded', function() {
    const postUrl = window.location.pathname.split('/').pop();
    fetchPost(postUrl);
    fetchComments(postUrl);
});

function fetchPost(postUrl) {
    // Fetch post content from the 'posts' directory
    // This is a placeholder implementation
    const post = {
        title: 'First Post',
        content: '<p>This is the content of the first post.</p>'
    };

    document.getElementById('post-title').innerText = post.title;
    document.getElementById('post-content').innerHTML = post.content;
}

function fetchComments(postUrl) {
    // Fetch comments from a JSON file associated with the post
    // This is a placeholder implementation
    const comments = [
        {
            text: 'This is the first comment.',
            date: '2024-08-01'
        },
        {
            text: 'This is the second comment.',
            date: '2024-08-02'
        }
    ];

    const commentsList = document.getElementById('comments-list');
    comments.forEach(comment => {
        const commentItem = document.createElement('div');
        commentItem.className = 'comment-item';
        commentItem.innerHTML = `
            <p>${comment.text}</p>
            <p>${new Date(comment.date).toLocaleDateString()}</p>
        `;
        commentsList.appendChild(commentItem);
    });
}

document.getElementById('comment-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const commentText = document.getElementById('comment-text').value;
    addComment(commentText);
});

function addComment(text) {
    const comment = {
        text: text,
        date: new Date().toISOString()
    };
    // Save comment to associated post's JSON file
    // This part requires GitHub API calls or another method of storing comments
}
