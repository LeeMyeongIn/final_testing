function changeLanguage(lang) {
    if (lang === 'ko') {
        document.getElementById('lang-ko').classList.add('active');
        document.getElementById('lang-en').classList.remove('active');
        document.querySelector('.logo h1').innerText = "발자국\n탐정";
        document.querySelectorAll('.category p')[0].innerText = "찾아주세요!";
        document.querySelectorAll('.category p')[1].innerText = "발견했어요!";
        document.querySelectorAll('.category p')[2].innerText = "병원이 어딘가요?";
        document.querySelectorAll('.category p')[3].innerText = "임시보호 중이에요!";
        document.querySelector('.auth-text a:nth-child(1)').innerText = "로그인";
        document.querySelector('.auth-text a:nth-child(2)').innerText = "회원가입";
        document.querySelector('.manual h2').innerText = "매뉴얼";
        document.querySelectorAll('.manual ul li')[0].innerText = "매뉴얼 내용";
    }
    else if (lang === 'en') {
        document.getElementById('lang-en').classList.add('active');
        document.getElementById('lang-ko').classList.remove('active');
        document.querySelector('.logo h1').innerText = "Pawprint\nDetective";
        document.querySelectorAll('.category p')[0].innerText = "I Lost..";
        document.querySelectorAll('.category p')[1].innerText = "I Found..";
        document.querySelectorAll('.category p')[2].innerText = "Where is the VET?";
        document.querySelectorAll('.category p')[3].innerText = "Under temporary protection..";
        document.querySelector('.auth-text a:nth-child(1)').innerText = "Login";
        document.querySelector('.auth-text a:nth-child(2)').innerText = "Sign Up";
        document.querySelector('.manual h2').innerText = "MANUAL";
        document.querySelectorAll('.manual ul li')[0].innerText = "Manual Content";
    }
}