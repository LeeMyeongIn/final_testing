function changeLanguage(lang) {
    if (lang === 'ko') {
        document.getElementById('lang-ko').classList.add('active');
        document.getElementById('lang-en').classList.remove('active');
        document.querySelector('.logo h1').innerText = "발자국\n탐정";
        document.querySelector('.myposts-section h2').innerText = "내가 작성한 게시물";
        document.getElementById('search-posts').placeholder = "게시물을 검색하세요...";
        document.getElementById('search-button').innerText = "검색";
        const headers = document.querySelectorAll('.posts-table th');
        headers[0].innerText = "번호";
        headers[1].innerText = "제목";
        headers[2].innerText = "작성자";
        headers[3].innerText = "작성일";
        const emptyMessage = document.querySelector('.posts-table td[colspan="4"]');
        if (emptyMessage) emptyMessage.innerText = "작성된 게시물이 없습니다.";
    }
    else if (lang === 'en') {
        document.getElementById('lang-en').classList.add('active');
        document.getElementById('lang-ko').classList.remove('active');
        document.querySelector('.logo h1').innerText = "Pawprint\nDetective";
        document.querySelector('.myposts-section h2').innerText = "My Posts...";
        document.getElementById('search-posts').placeholder = "Search for posts...";
        document.getElementById('search-button').innerText = "Search";
        const headers = document.querySelectorAll('.posts-table th');
        headers[0].innerText = "No";
        headers[1].innerText = "Title";
        headers[2].innerText = "Author";
        headers[3].innerText = "Date";
        const emptyMessage = document.querySelector('.posts-table td[colspan="4"]');
        if (emptyMessage) emptyMessage.innerText = "No posts available.";
    }
}
