document.addEventListener('DOMContentLoaded', () => {
    // URL 파라미터에서 게시물 ID 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const postId = parseInt(urlParams.get('id'), 10) || 0;
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    const post = posts[postId];
    const isLoggedIn = true; // 로그인 여부 확인 (실제로는 서버에서 확인 필요)

    if (!post) {
        alert('게시물이 존재하지 않습니다.');
        window.location.href = 'protectList.html';
        return;
    }

    // 게시물 데이터 표시
    document.getElementById('post-title').textContent = post.title;
    document.getElementById('post-image').src = post.image || 'default-image.jpg';
    document.getElementById('post-details').textContent = post.details;

    // 댓글 섹션
    const comments = post.comments || [];
    const commentContainer = document.getElementById('comments');

    // 팝업 생성 함수
    const showReportPopup = (nickname) => {
        if (!isLoggedIn) {
            alert('로그인 후에 신고할 수 있습니다.');
            return;
        }

        // 팝업 HTML 동적 생성
        const popup = document.createElement('div');
        popup.style.position = 'fixed';
        popup.style.top = '50%';
        popup.style.left = '50%';
        popup.style.transform = 'translate(-50%, -50%)';
        popup.style.backgroundColor = '#fff';
        popup.style.padding = '20px';
        popup.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        popup.style.borderRadius = '8px';
        popup.style.zIndex = '1000';

        popup.innerHTML = `
            <h2>신고하기</h2>
            <p>신고할 닉네임: ${nickname}</p>
            <label for="report-reason">신고 사유:</label>
            <textarea id="report-reason" style="width: 100%; height: 80px; margin-top: 5px; margin-bottom: 10px;"></textarea>
            <button id="submit-report" style="background-color: #ffa500; color: white; border: none; border-radius: 4px; padding: 10px;">신고 제출</button>
            <button id="cancel-report" style="background-color: #ccc; border: none; border-radius: 4px; padding: 10px; margin-left: 10px;">취소</button>
        `;

        document.body.appendChild(popup);

        // 신고 제출 버튼 이벤트
        document.getElementById('submit-report').addEventListener('click', () => {
            const reason = document.getElementById('report-reason').value.trim();
            if (reason) {
                alert(`닉네임 "${nickname}"이 신고되었습니다.\n신고 사유: ${reason}`);
                document.body.removeChild(popup);
                // 실제로는 서버에 신고 데이터를 전송하는 API를 호출해야 합니다.
            } else {
                alert('신고 사유를 입력하세요.');
            }
        });

        // 취소 버튼 이벤트
        document.getElementById('cancel-report').addEventListener('click', () => {
            document.body.removeChild(popup);
        });
    };

    // 댓글 렌더링 함수
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
            reportButton.textContent = '신고하기';
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

    // 댓글 추가 기능
    document.getElementById('add-comment').addEventListener('click', () => {
        const commentInput = document.getElementById('comment-input');
        const nicknameInput = prompt('닉네임을 입력하세요:'); // 닉네임을 입력받음
        const newComment = commentInput.value.trim();

        if (newComment && nicknameInput) {
            comments.push({ nickname: nicknameInput, comment: newComment });
            post.comments = comments;
            localStorage.setItem('posts', JSON.stringify(posts));
            renderComments();
            commentInput.value = '';
        } else {
            alert('닉네임과 댓글 내용을 모두 입력하세요.');
        }
    });

    // 언어 변경 관련 로직
    const langBtns = document.querySelectorAll('.lang-btn');
    const content = {
        ko: {
            title: '임시보호 게시물 보기',
            commentPlaceholder: '댓글을 작성하세요...',
            addComment: '댓글 작성 완료',
        },
        en: {
            title: 'View Protect Post',
            commentPlaceholder: 'Write a comment...',
            addComment: 'Submit Comment',
        },
    };

    function updateLanguage(lang) {
        document.querySelector('h1').textContent = content[lang].title;
        document.querySelector('#comment-input').placeholder = content[lang].commentPlaceholder;
        document.querySelector('#add-comment').textContent = content[lang].addComment;
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
