document.addEventListener('DOMContentLoaded', () => {
    // 게시물 관련 로직
    const tableBody = document.querySelector('.post-table tbody'); // 게시물 테이블
    const noPostsMessage = document.querySelector('.no-posts'); // "게시물이 없습니다" 메시지

    const postsRef = ref(db, 'Post');
    onValue(postsRef, (snapshot) => {
        const posts = [];
        snapshot.forEach((childSnapshot) => {
            const post = childSnapshot.val();
            posts.push(post);
        });

        if (posts.length === 0) {
            noPostsMessage.style.display = 'block'; // 게시물이 없으면 메시지 표시
        } else {
            noPostsMessage.style.display = 'none'; // 게시물이 있으면 메시지 숨김
            tableBody.innerHTML = ''; // 기존 내용 초기화
            posts.forEach((post, index) => {
                const row = `
                    <tr>
                        <td>${index + 1}</td> <!-- 번호 -->
                        <td><a href="lostPost.html">${post.title}</a></td> <!-- 제목 -->
                        <td>${post.author}</td> <!-- 작성자 -->
                        <td>${post.date}</td> <!-- 작성일 -->
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        }
    });
