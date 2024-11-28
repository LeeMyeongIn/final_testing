// 번역 데이터 객체 (전역에 선언)
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
        'page-title': '발견 게시물 작성',
        'titlePlaceholder': '제목을 입력해 주세요.',
        'photoLabel': '사진 첨부',
        'detailPlaceholder': '발견한 동물의 이름, 특징, 성별, 종, 발견 위치, 발견 시간 등을 상세하게 적어 주세요.',
        'submitButton': '작성 완료',
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
        'page-title': 'Create Found Post',
        'titlePlaceholder': 'Enter a title.',
        'photoLabel': 'Attach Photo',
        'detailPlaceholder': 'Provide details such as the animal’s name, characteristics, gender, species, location, and time.',
        'submitButton': 'Submit Post',
    }
};

document.addEventListener('DOMContentLoaded', () => {
    // 게시물 작성 버튼 클릭 이벤트
    document.getElementById('submit-button').addEventListener('click', () => {
        const title = document.querySelector('.title-section input').value;
        const author = "익명"; // 기본 작성자
        const date = new Date().toLocaleString(); // 작성일

        if (!title) {
            alert('제목을 입력해주세요!');
            return;
        }

        const postData = { title, author, date };
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts.push(postData); // 데이터 추가
        localStorage.setItem('posts', JSON.stringify(posts)); // 로컬 스토리지에 저장

        window.location.href = 'findList.html'; // 게시물 목록으로 이동
    });

    // 언어 변경 로직
    const langBtns = document.querySelectorAll('.lang-btn');

    function updateLanguage(lang) {
        // 헤더 번역
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang][key]) {
                const img = element.querySelector('img');
                if (img) {
                    // img 태그가 있는 경우 텍스트만 변경
                    element.childNodes.forEach(node => {
                        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
                            node.textContent = translations[lang][key];
                        }
                    });
                } else {
                    // 일반 텍스트 변경
                    element.textContent = translations[lang][key];
                }
            }
        });

        // 페이지 제목 번역
        document.querySelector('title').textContent = translations[lang]['page-title'];

        // 입력 폼 번역
        document.querySelector('.title-section input').placeholder = translations[lang]['titlePlaceholder'];
        document.querySelector('.photo-section label').textContent = translations[lang]['photoLabel'];
        document.querySelector('.detail-section textarea').placeholder = translations[lang]['detailPlaceholder'];
        document.getElementById('submit-button').textContent = translations[lang]['submitButton'];
    }

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.id === 'btn-ko' ? 'ko' : 'en';
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            updateLanguage(lang);
        });
    });

    // 초기 언어 설정
    const defaultLang = 'ko';
    updateLanguage(defaultLang);
    document.getElementById('btn-ko').classList.add('active');
});
