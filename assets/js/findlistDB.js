// 게시물 관련 로직 업데이트
// 게시물 관련 로직
const postTableBody = document.querySelector('.post-table tbody');
const noPostsMessage = document.querySelector('.no-posts');

// Firebase에서 게시물 가져오기
database.ref('Post').orderByChild('category').equalTo('발견').once('value')
    .then((snapshot) => {
        if (snapshot.exists()) {
            const posts = snapshot.val();
            let index = 1;
            Object.keys(posts).forEach((key) => {
                const post = posts[key];
                const row = `
                    <tr>
                        <td>${index++}</td>
                        <td><a href="findPost.html?pid=${key}">${post.title}</a></td>
                        <td>익명</td>
                        <td>${new Date(post.pid).toLocaleDateString()}</td>
                    `;
                postTableBody.innerHTML += row;
            });
            noPostsMessage.style.display = 'none';
        } else {
            noPostsMessage.style.display = 'block';
        }
    })
    .catch((error) => {
        console.error("게시물 목록을 가져오는 중 오류 발생:", error);
    });
