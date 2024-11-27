// 중복 검사 상태를 저장하는 변수
let isUsernameChecked = false;
let isNicknameChecked = false;

function checkPasswordMatch() {
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    const messageElement = document.getElementById('password-check-message');
    const signupButton = document.getElementById('signup-button');

    if (password === confirmPassword && password !== "") {
        messageElement.style.color = "green";
        messageElement.innerText = "비밀번호가 일치합니다.";
        messageElement.style.display = "block";
    } else {
        messageElement.style.color = "red";
        messageElement.innerText = "비밀번호가 일치하지 않습니다.";
        messageElement.style.display = "block";
    }
    toggleSignupButton(); // 비밀번호 확인 후 버튼 상태 업데이트
}

function validateSignup() {
    const username = document.getElementById('signup-username').value;
    const nickname = document.getElementById('signup-nickname').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;

    if (!isUsernameChecked) {
        alert("아이디 중복 검사를 진행해주세요.");
        return false;
    }

    if (!isNicknameChecked) {
        alert("닉네임 중복 검사를 진행해주세요.");
        return false;
    }

    if (password !== confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        return false;
    }

    if (!username || !nickname || !password || !confirmPassword) {
        alert("모든 필드를 입력해주세요.");
        return false;
    }

    return true;
}

function toggleSignupButton() {
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    const signupButton = document.getElementById('signup-button');

    // 버튼 활성화 조건: 중복 검사 완료 + 비밀번호 일치
    if (isUsernameChecked && isNicknameChecked && password === confirmPassword && password !== "") {
        signupButton.disabled = false;
    } else {
        signupButton.disabled = true;
    }
}

document.getElementById('signup-password').addEventListener('input', checkPasswordMatch);
document.getElementById('signup-confirm-password').addEventListener('input', checkPasswordMatch);

// 아이디 중복 검사
document.querySelector('.input-container button').addEventListener('click', function () {
    const username = document.getElementById('signup-username').value;
    if (username) {
        // 중복 검사 로직 (예: 서버 호출로 확인)
        alert("아이디 중복 확인 완료!");
        isUsernameChecked = true;
        toggleSignupButton();
    } else {
        alert("아이디를 입력해주세요.");
    }
});

// 닉네임 중복 검사
document.querySelectorAll('.input-container button')[1].addEventListener('click', function () {
    const nickname = document.getElementById('signup-nickname').value;
    if (nickname) {
        // 중복 검사 로직 (예: 서버 호출로 확인)
        alert("닉네임 중복 확인 완료!");
        isNicknameChecked = true;
        toggleSignupButton();
    } else {
        alert("닉네임을 입력해주세요.");
    }
});
