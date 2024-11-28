document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('form'); // 회원가입 폼
    const passwordCheckMessage = document.getElementById('password-check-message'); // 비밀번호 확인 메시지
    const signupButton = document.getElementById('signup-button'); // 회원가입 버튼

    // 비밀번호 확인
    function validatePasswordMatch() {
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;

        if (password !== confirmPassword || password === '') {
            passwordCheckMessage.style.color = 'red';
            passwordCheckMessage.textContent = '비밀번호가 일치하지 않습니다.';
            passwordCheckMessage.style.display = 'block';
            signupButton.disabled = true;
            return false;
        } else {
            passwordCheckMessage.style.color = 'green';
            passwordCheckMessage.textContent = '비밀번호가 일치합니다.';
            passwordCheckMessage.style.display = 'block';
            signupButton.disabled = false;
            return true;
        }
    }

    // 비밀번호 입력 이벤트 리스너
    document.getElementById('signup-password').addEventListener('input', validatePasswordMatch);
    document.getElementById('signup-confirm-password').addEventListener('input', validatePasswordMatch);

    // Firebase 데이터베이스 초기화
    const database = firebase.database();

    // 폼 제출 이벤트
    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // 기본 폼 제출 방지

        // 입력 데이터 가져오기
        const loginID = document.getElementById('signup-loginID').value;
        const nickName = document.getElementById('signup-nickName').value;
        const password = document.getElementById('signup-password').value;

        if (!validatePasswordMatch()) {
            alert('비밀번호를 확인해주세요.');
            return;
        }

        try {
            // Firebase 데이터베이스에 회원 데이터 저장
            const newUserRef = database.ref('UserData').push(); // 새로운 사용자 ID 생성
            await newUserRef.set({
                uid: newUserRef.key, // Firebase에서 생성한 고유 ID
                nickName: nickName,
                loginID: loginID,
                password: password,
                login_method: 1 // 예: 1은 이메일 로그인
            });

            alert('회원가입이 완료되었습니다!');
            signupForm.reset(); // 폼 초기화
            window.location.href = 'login.html'; // 로그인 화면으로 이동
        } catch (error) {
            console.error('회원가입 요청 중 오류 발생:', error);
            alert('회원 데이터를 저장하는 동안 오류가 발생했습니다. 다시 시도해주세요.');
        }
    });
});
