
// 로그인 유효성 검사 및 DB 기반 인증 처리
async function validateLogin() {
    const loginID = document.getElementById('login-loginID').value;
    const password = document.getElementById('login-password').value;

    // 입력 값 검증
    if (!loginID || !password) {
        alert('아이디와 비밀번호를 모두 입력해주세요.');
        return false;
    }

    try {
        // Realtime Database에서 입력된 loginID와 일치하는 사용자 검색
        const snapshot = await database
            .ref('UserData')
            .orderByChild('loginID')
            .equalTo(loginID)
            .once('value');

        if (snapshot.exists()) {
            // 해당 loginID에 대한 데이터가 존재할 경우
            const userData = Object.values(snapshot.val())[0];

            // 비밀번호 확인
            if (userData.password === password) {
                // 로그인 성공 처리
                localStorage.setItem('loggedIn', 'true');
                localStorage.setItem('username', userData.nickName); // 닉네임 저장
                alert('로그인 성공!');
                window.location.href = 'index.html'; // 메인 페이지로 이동
                return false; // 기본 폼 제출 방지
            } else {
                alert('비밀번호가 잘못되었습니다.');
                return false;
            }
        } else {
            alert('아이디가 존재하지 않습니다.');
            return false;
        }
    } catch (error) {
        console.error('로그인 중 오류 발생:', error);
        alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
        return false;
    }
}
function customAddEventListener(element, eventType, callback) {
    if (element && eventType && typeof callback === 'function') {
        element[`on${eventType}`] = callback; // 이벤트 핸들러를 직접 할당
    } else {
        console.error('올바르지 않은 요소, 이벤트 유형, 또는 콜백 함수입니다.');
    }
}


