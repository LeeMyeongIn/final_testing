document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.querySelector('form');
    const passwordCheckMessage = document.getElementById('password-check-message');
    const signupButton = document.getElementById('signup-button');

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

    document.getElementById('signup-password').addEventListener('input', validatePasswordMatch);
    document.getElementById('signup-confirm-password').addEventListener('input', validatePasswordMatch);

    const database = firebase.database();

    signupForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const loginID = document.getElementById('signup-loginID').value;
        const nickName = document.getElementById('signup-nickName').value;
        const password = document.getElementById('signup-password').value;

        if (!validatePasswordMatch()) {
            alert('비밀번호를 확인해주세요.');
            return;
        }

        // 중복 확인
        const snapshot = await database.ref('UserData').orderByChild('loginID').equalTo(loginID).once('value');
        if (snapshot.exists()) {
            alert('이미 사용 중인 이메일입니다.');
            return;
        }

        // 비밀번호 암호화 후 저장
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUserRef = database.ref('UserData').push();
        await newUserRef.set({
            uid: newUserRef.key,
            nickName: nickName,
            loginID: loginID,
            password: hashedPassword,
            login_method: 1
        });

        alert('회원가입이 완료되었습니다!');
        signupForm.reset();
        window.location.href = 'login.html';
    });
});
