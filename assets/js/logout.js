document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById("logout");

    logoutButton.addEventListener("click", () => {
        // 서버에서 세션 종료 요청 (필요 시)
        fetch("/api/logout", { method: "POST" });

        // 로컬 로그인 상태 제거
        localStorage.removeItem("userLoggedIn");
        localStorage.removeItem("username");
        alert("로그아웃되었습니다.");
        window.location.href = "index.html";
    });
});
