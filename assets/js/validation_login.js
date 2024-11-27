function validateLogin() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    if (username === "admin" && password === "1234") {
        localStorage.setItem("isLoggedIn", "true"); // 로그인 상태 저장
        window.location.href = "index.html"; // 메인 화면으로 이동
        return false;
    } else {
        alert("아이디 또는 비밀번호가 잘못되었습니다.");
        return false;
    }
}
