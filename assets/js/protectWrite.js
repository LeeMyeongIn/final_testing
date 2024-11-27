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

        window.location.href = 'protectList.html'; // 게시물 목록으로 이동
    });

    // 언어 변경 관련 로직
    const langBtns = document.querySelectorAll('.lang-btn');
    const content = {
        ko: {
            title: '임시보호 게시물 작성',
            titlePlaceholder: '제목을 입력해 주세요.',
            photoLabel: '사진 첨부',
            detailPlaceholder: '임시보호 중인 동물의 특징, 성별, 종 등을 상세하게 적어 주세요.',
            submitButton: '작성 완료',
        },
        en: {
            title: 'Create Protect Post',
            titlePlaceholder: 'Enter a title.',
            photoLabel: 'Attach Photo',
            detailPlaceholder: 'Provide details such as the animal’s characteristics, gender, species.',
            submitButton: 'Submit Post',
        },
    };

    function updateLanguage(lang) {
        document.querySelector('title').textContent = content[lang].title;
        document.querySelector('.title-section input').placeholder = content[lang].titlePlaceholder;
        document.querySelector('.photo-section label').textContent = content[lang].photoLabel;
        document.querySelector('.detail-section textarea').placeholder = content[lang].detailPlaceholder;
        document.querySelector('#submit-button').textContent = content[lang].submitButton;
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
