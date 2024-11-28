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
                    <td><a href="protectPost.html">${post.title}</a></td> <!-- 제목 -->
                    <td>${post.author}</td> <!-- 작성자 -->
                    <td>${post.date}</td> <!-- 작성일 -->
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    }

    // 언어 버튼 관련 로직
    const langBtns = document.querySelectorAll('.lang-btn');
    const content = {
        ko: {
            title: '임시보호 게시물',
            noPosts: '작성된 게시물이 없습니다.',
            postButton: '게시글 작성',
            searchPlaceholder: '게시물을 검색하세요...',
        },
        en: {
            title: 'Temporary Protection Posts',
            noPosts: 'No posts available.',
            postButton: 'Create Post',
            searchPlaceholder: 'Search for posts...',
        },
    };

    const translations = {
        ko: {
            'header-number': '번호',
            'header-title': '제목',
            'header-author': '작성자',
            'header-date': '작성일',
            'header-lost': '실종',
            'header-find': '발견',
            'header-protect': '임시보호',
            'header-vet': '동물병원',
            'login': '로그인',
            'signup': '회원가입',
            'logout': '로그아웃',
            'mypage': '마이페이지',
        },
        en: {
            'header-number': 'Number',
            'header-title': 'Title',
            'header-author': 'Author',
            'header-date': 'Date',
            'header-lost': 'Lost',
            'header-find': 'Found',
            'header-protect': 'Temporary Protection',
            'header-vet': 'Veterinary Clinic',
            'login': 'Login',
            'signup': 'Sign Up',
            'logout': 'Logout',
            'mypage': 'My Page',
        }
    };    

    function updateLanguage(lang) {
        // 페이지 콘텐츠 번역
        document.querySelector('h1').textContent = content[lang].title;
        document.querySelector('.no-posts p').textContent = content[lang].noPosts;
        document.querySelector('#post-create-button').textContent = content[lang].postButton;
        document.querySelector('.search-bar input').placeholder = content[lang].searchPlaceholder;
    
        // 헤더 번역
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang][key]) {
                // img 태그는 유지하고 텍스트 노드만 변경
                const img = element.querySelector('img');
                if (img) {
                    // 텍스트 노드만 찾아서 변경
                    Array.from(element.childNodes).forEach(node => {
                        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
                            node.textContent = translations[lang][key];
                        }
                    });
                } else {
                    // img 태그가 없으면 전체 텍스트 변경
                    element.textContent = translations[lang][key];
                }
            }
        });
    }    

    // 언어 버튼 이벤트 리스너 추가
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.id === 'btn-ko' ? 'ko' : 'en';
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateLanguage(lang); // 헤더 포함 번역
        });
    });

    // 페이지 로드 시 기본 언어 설정
    const defaultLang = 'ko'; // 초기 언어는 한국어
    updateLanguage(defaultLang);
    document.getElementById('btn-ko').classList.add('active');
});
