document.getElementById('submit-button').addEventListener('click', () => {
    const title = document.querySelector('.title-section input').value;
    const author = "익명"; // 기본 작성자
    const date = new Date().toLocaleString(); // 작성일

    if (!title) {
        alert('제목을 입력해주세요!');
       return;
    }

    const postData = { title, author, date };
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    posts.push(postData); // 데이터 추가
    localStorage.setItem('posts', JSON.stringify(posts)); // 로컬 스토리지에 저장

    window.location.href = 'findList.html'; // 게시물 목록으로 이동
});