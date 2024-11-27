document.addEventListener('DOMContentLoaded', () => {
    // 게시물 관련 로직
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
                    <td><a href="lostPost.html">${post.title}</a></td> <!-- 제목 -->
                    <td>${post.author}</td> <!-- 작성자 -->
                    <td>${post.date}</td> <!-- 작성일 -->
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    }

    // 언어 변경 관련 로직
    const langBtns = document.querySelectorAll('.lang-btn');
    const content = {
        ko: {
            title: '실종 게시물',
            noPosts: '작성된 게시물이 없습니다.',
            postButton: '게시글 작성',
            searchPlaceholder: '게시물을 검색하세요...',
        },
        en: {
            title: 'Lost Posts',
            noPosts: 'No posts available.',
            postButton: 'Create Post',
            searchPlaceholder: 'Search for posts...',
        },
    };

    function updateLanguage(lang) {
        document.querySelector('h1').textContent = content[lang].title;
        document.querySelector('.no-posts p').textContent = content[lang].noPosts;
        document.querySelector('#post-create-button').textContent = content[lang].postButton;
        document.querySelector('.search-bar input').placeholder = content[lang].searchPlaceholder;
    }

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.id === 'btn-ko' ? 'ko' : 'en';
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateLanguage(lang);
        });
    });
});
