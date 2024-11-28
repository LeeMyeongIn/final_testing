document.addEventListener('DOMContentLoaded', () => {
    // 게시물 작성 버튼 클릭 이벤트
    document.getElementById('submit-button').addEventListener('click', () => {
        const title = document.querySelector('.title-section input').value;
        const details = document.querySelector('.detail-section textarea').value;
        const authorId = localStorage.getItem('uid'); // 사용자 ID 가져오기
        const date = new Date().toLocaleString(); // 작성일

        if (!title) {
            alert('제목을 입력해주세요!');
            return;
        }

        // 작성자 닉네임 가져오기
        const userRef = ref(db, `UserData/${authorId}`);
        get(userRef).then((userSnapshot) => {
            if (userSnapshot.exists()) {
                const { nickName } = userSnapshot.val();
                const postData = { title, details, author: nickName, date };
                
                // 게시물 데이터 저장
                const newPostRef = push(ref(db, 'Post'));
                newPostRef.set(postData).then(() => {
                    window.location.href = 'findList.html'; // 게시물 목록으로 이동
                }).catch((error) => {
                    console.error("Error saving post: ", error);
                    alert('게시물을 저장하는 중 오류가 발생했습니다.');
                });
            } else {
                alert('사용자 정보를 찾을 수 없습니다.');
            }
        }).catch((error) => {
            console.error("Error fetching user data: ", error);
            alert('사용자 정보를 불러오는 중 오류가 발생했습니다.');
        });
    });
});
