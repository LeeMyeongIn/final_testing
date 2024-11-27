document.addEventListener('DOMContentLoaded', () => {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const tableBody = document.querySelector('.post-table tbody'); // 게시물 테이블
    const noPostsMessage = document.querySelector('.no-posts'); // "게시물이 없습니다" 메시지

    if (posts.length === 0) {
        noPostsMessage.style.display = 'block'; // 게시물이 없으면 메시지 표시
    } else {
        noPostsMessage.style.display = 'none'; // 게시물이 있으면 메시지 숨김
        posts.forEach((post, index) => {
            const row = `
                <tr>
                    <td>${index + 1}</td> <!-- 번호 -->
                    <td><a href="findPost.html">${post.title}</a></td> <!-- 제목 -->
                    <td>${post.author}</td> <!-- 작성자 -->
                    <td>${post.date}</td> <!-- 작성일 -->
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    }
})