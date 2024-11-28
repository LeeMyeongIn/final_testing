document.addEventListener('DOMContentLoaded', () => {
    const translations = {
        ko: {
            'header-lost': '실종',
            'header-find': '발견',
            'header-protect': '임시보호',
            'header-vet': '동물병원',
            'login': '로그인',
            'signup': '회원가입',
            'logout': '로그아웃',
            'mypage': '마이페이지',
            'page-title': '발견 게시물 보기',
            'commentPlaceholder': '댓글을 작성하세요...',
            'addComment': '댓글 작성 완료',
            'report': '신고하기', // 신고하기 번역 추가
        },
        en: {
            'header-lost': 'Lost',
            'header-find': 'Found',
            'header-protect': 'Temporary Protection',
            'header-vet': 'Veterinary Clinic',
            'login': 'Login',
            'signup': 'Sign Up',
            'logout': 'Logout',
            'mypage': 'My Page',
            'page-title': 'View Found Post',
            'commentPlaceholder': 'Write a comment...',
            'addComment': 'Submit Comment',
            'report': 'Report', // 신고하기 번역 추가
        }
    };

    function updateLanguage(lang) {
        // 일반 텍스트 번역
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });

        // 댓글 입력 및 버튼 번역
        document.querySelector('#comment-input').placeholder = translations[lang]['commentPlaceholder'];
        document.querySelector('#add-comment').textContent = translations[lang]['addComment'];

        // 신고 버튼 번역
        document.querySelectorAll('.comment-report-btn').forEach(button => {
            button.textContent = translations[lang]['report'];
        });
    }

    const langBtns = document.querySelectorAll('.lang-btn');

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.id === 'btn-ko' ? 'ko' : 'en';
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateLanguage(lang);
        });
    });

    // 초기 언어 설정
    const defaultLang = 'ko'; // 기본 언어 설정
    updateLanguage(defaultLang);
    document.getElementById('btn-ko').classList.add('active');
    
    // 댓글 섹션 렌더링 로직
    const urlParams = new URLSearchParams(window.location.search);
    const postId = parseInt(urlParams.get('id'), 10) || 0;
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const post = posts[postId];

    if (!post) {
        alert('게시물이 존재하지 않습니다.');
        window.location.href = 'findList.html';
        return;
    }
    
    // 게시물 제목 표시
    const postTitleElement = document.getElementById('post-title');
    if (post.title) {
        postTitleElement.textContent = post.title;
    } else {
        postTitleElement.textContent = '제목 없음'; // 제목이 없는 경우 기본값 설정
    }

    // 게시물 내용 설정
    const postDetailsElement = document.getElementById('post-details');
    if (post.details) {
        postDetailsElement.textContent = post.details;
    } else {
        postDetailsElement.textContent = '내용이 없습니다.'; // 내용이 없는 경우 기본값 설정
    }

    // 댓글 표시
    const comments = post.comments || [];
    const commentContainer = document.getElementById('comments');

    const renderComments = () => {
        commentContainer.innerHTML = '';
        comments.forEach((commentObj, index) => {
            const { nickname, comment } = commentObj;

            const commentElement = document.createElement('div');
            commentElement.style.display = "flex";
            commentElement.style.alignItems = "center";

            // 닉네임과 댓글 내용
            const commentText = document.createElement('span');
            commentText.textContent = `${index + 1}. [${nickname}] ${comment}`;
            commentText.style.flexGrow = "1";

            // 신고하기 버튼
            const reportButton = document.createElement('button');
            reportButton.textContent = translations[defaultLang]['report']; // 초기 텍스트 설정
            reportButton.className = 'comment-report-btn'; // 번역용 클래스 추가
            reportButton.style.marginLeft = '10px';
            reportButton.style.backgroundColor = '#ffa500';
            reportButton.style.color = 'white';
            reportButton.style.border = 'none';
            reportButton.style.borderRadius = '4px';
            reportButton.style.cursor = 'pointer';

            reportButton.addEventListener('click', () => showReportPopup(nickname));

            // 댓글과 버튼 추가
            commentElement.appendChild(commentText);
            commentElement.appendChild(reportButton);
            commentContainer.appendChild(commentElement);
        });
    };

    renderComments();
});
