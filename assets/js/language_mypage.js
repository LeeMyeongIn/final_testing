function changeLanguage(lang) {
    if (lang === 'ko') {
        document.getElementById('lang-ko').classList.add('active');
        document.getElementById('lang-en').classList.remove('active');
        document.querySelector('.logo h1').innerText = "발자국\n탐정";
        document.querySelector('.mypage-section h2').innerText = "마이페이지";
        const labels = document.querySelectorAll('.mypage-section .form-group label');
        labels[0].innerText = "아이디";
        labels[1].innerText = "닉네임";
        document.getElementById('myposts-button').innerText = "내가 작성한 게시글 보기";
    }
    else if (lang === 'en') {
        document.getElementById('lang-en').classList.add('active');
        document.getElementById('lang-ko').classList.remove('active');
        document.querySelector('.logo h1').innerText = "Pawprint\nDetective";
        document.querySelector('.mypage-section h2').innerText = "MYPAGE";
        const labels = document.querySelectorAll('.mypage-section .form-group label');
        labels[0].innerText = "Username";
        labels[1].innerText = "Nickname";
        document.getElementById('myposts-button').innerText = "View My Posts";
    }
}