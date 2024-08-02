// Import Octokit if using npm
// const { Octokit } = require("@octokit/rest");

// Initialize Octokit with your GitHub token
const octokit = new Octokit({ auth: 'your_github_token' }); // Replace 'your_github_token' with your actual token

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const postForm = document.getElementById('post-form');
    const adminContainer = document.getElementById('admin-container');
    const loginContainer = document.getElementById('login-container');
    const postsList = document.getElementById('posts-list');

    // Handle login
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const password = document.getElementById('admin-password').value;
        if (password === 'your_password') { // Replace with your actual password
            loginContainer.style.display = 'none';
            adminContainer.style.display = 'block';
            fetchPosts(); // Load existing posts
        } else {
            alert('Incorrect password');
        }
    });

    // Handle post creation
    postForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const title = document.getElementById('post-title').value;
        const content = tinymce.get('post-editor').getContent();
        savePost(title, content);
    });

    async function savePost(title, content) {
        const post = {
            title: title,
            content: content,
            date: new Date().toISOString()
        };
        const filename = `posts/${title.replace(/\s+/g, '-').toLowerCase()}.json`;
        const fileContent = JSON.stringify(post, null, 2);

        try {
            await octokit.repos.createOrUpdateFileContents({
                owner: 'Garrett', // Replace with your GitHub username or organization name
                repo: 'GarrettsLab', // Replace with your repository name
                path: filename,
                message: `Create post: ${title}`,
                content: Buffer.from(fileContent).toString('base64')
            });
            alert('Post saved');
            fetchPosts(); // Refresh the post list
        } catch (error) {
            console.error('Error saving post:', error);
            alert('Error saving post');
        }
    }

    async function fetchPosts() {
        try {
            const { data } = await octokit.repos.listContents({
                owner: 'Garrett', // Replace with your GitHub username or organization name
                repo: 'GarrettsLab', // Replace with your repository name
                path: 'posts'
            });

            postsList.innerHTML = '';
            data.forEach(file => {
                const postItem = document.createElement('li');
                postItem.innerHTML = `
                    <a href="${file.download_url}">${file.name}</a>
                    <button onclick="deletePost('${file.path}')">Delete</button>
                `;
                postsList.appendChild(postItem);
            });
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }

    window.deletePost = async function(filePath) {
        if (confirm('Are you sure you want to delete this post?')) {
            try {
                await octokit.repos.deleteFile({
                    owner: 'Garrett', // Replace with your GitHub username or organization name
                    repo: 'GarrettsLab', // Replace with your repository name
                    path: filePath,
                    message: `Delete post: ${filePath}`,
                    sha: await getFileSha(filePath) // Get the SHA of the file to delete it
                });
                alert('Post deleted');
                fetchPosts(); // Refresh the post list
            } catch (error) {
                console.error('Error deleting post:', error);
                alert('Error deleting post');
            }
        }
    };

    async function getFileSha(filePath) {
        try {
            const { data } = await octokit.repos.getContent({
                owner: 'Garrett', // Replace with your GitHub username or organization name
                repo: 'GarrettsLab', // Replace with your repository name
                path: filePath
            });
            return data.sha;
        } catch (error) {
            console.error('Error getting file SHA:', error);
            throw error;
        }
    }
});
