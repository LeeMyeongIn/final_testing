// 관리자 계정 생성 함수
async function createAdminAccount() {
    try {
        // Firebase Database에서 admin 계정이 이미 존재하는지 확인
        const snapshot = await database.ref('UserData/admin').once('value');
        if (snapshot.exists()) {
            console.log("관리자 계정이 이미 존재합니다.");
            return; // 계정이 이미 존재하면 함수 종료
        }

        // admin 계정 데이터
        const adminData = {
            loginID: "admin",
            password: "1234",
            nickName: "관리자"
        };

        // Firebase Database에 admin 계정 추가
        await database.ref('UserData/admin').set(adminData);
        console.log("관리자 계정이 성공적으로 생성되었습니다!");
    } catch (error) {
        console.error("관리자 계정을 생성하는 중 오류 발생:", error);
    }
}

// 관리자 계정 생성 호출 (필요할 때 실행)
createAdminAccount();


// 로그인 유효성 검사 및 처리
async function validateLogin() {
    const loginID = document.getElementById('login-loginID').value;
    const password = document.getElementById('login-password').value;

    // 간단한 유효성 검사
    if (!loginID || !password) {
        alert("아이디와 비밀번호를 모두 입력해주세요.");
        return false;
    }

    try {
        // Firebase Realtime Database에서 loginID를 검색
        const snapshot = await database
            .ref('UserData')
            .orderByChild('loginID')
            .equalTo(loginID)
            .once('value');

        if (snapshot.exists()) {
            const userData = Object.values(snapshot.val())[0];

            // 비밀번호 확인
            if (userData.password === password) {
                // 로그인 상태 저장
                localStorage.setItem("loggedIn", "true");
                localStorage.setItem("username", userData.nickName); // 닉네임 저장

                // index.html로 리다이렉트
                alert("로그인 성공!");
                window.location.href = "index.html";
                return false;
            } else {
                alert("비밀번호가 잘못되었습니다.");
                return false;
            }
        } else {
            alert("아이디가 존재하지 않습니다.");
            return false;
        }
    } catch (error) {
        console.error("로그인 중 오류 발생:", error);
        alert("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
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


// 로그인 폼 가져오기
const form = document.querySelector('form');

if (form) {
    // 표준 addEventListener 사용
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // 기본 동작 방지
        validateLogin(); // 로그인 유효성 검사 및 처리
    });
} else {
    console.error('로그인 폼을 찾을 수 없습니다. 폼이 존재하는지 확인하세요.');
}
