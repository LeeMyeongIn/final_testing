// 로그인 함수
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // 예제: 간단한 로그인 확인 (실제로는 서버와 통신해야 함)
    if (username === "user" && password === "password") {
        alert("로그인 성공!");
        localStorage.setItem('isLoggedIn', "true"); // 로그인 상태 저장
        window.location.href = 'logged_in.html'; // 로그인한 사용자 화면으로 이동
    } else {
        alert("아이디 또는 비밀번호가 잘못되었습니다.");
    }
}

// 로그아웃 함수
function logout() {
    localStorage.removeItem('isLoggedIn'); // 로그인 상태 제거
    alert("로그아웃 되었습니다.");
    window.location.href = 'index.html'; // 비로그인 상태 첫 화면으로 이동
}
