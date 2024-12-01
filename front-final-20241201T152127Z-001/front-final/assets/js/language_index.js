// language_index.js

// 번역 데이터
const translations = {
    ko: {
        title: "발자국<br>탐정",
        categories: ["찾아주세요..", "발견했어요!", "병원이 어딘가요?", "임시보호 중이에요!"],
        auth: {
            loggedOut: ["로그인", "회원가입"],
            loggedIn: ["마이페이지", "로그아웃"]
        },
        manual: {
            title: "메뉴얼",
            content: ["메뉴얼 내용", "-", "-"]
        },
        chatSidebar: "채팅 목록",
        chatPopup: "채팅방",
        chatPlaceholder: "메시지를 입력하세요",
        chatSend: "전송"
    },
    en: {
        title: "Pawprint<br>Detective",
        categories: ["I Lost..", "I Found..", "Where is the VET?", "Under temporary protection.."],
        auth: {
            loggedOut: ["Login", "Sign Up"],
            loggedIn: ["My Page", "Logout"]
        },
        manual: {
            title: "MANUAL",
            content: ["-", "-", "-"]
        },
        chatSidebar: "Chat List",
        chatPopup: "Chat Room",
        chatPlaceholder: "Type your message here",
        chatSend: "Send"
    }
};

// 언어 변경 함수
function changeLanguage(lang) {
    // 제목 변경
    document.querySelector(".logo h1").innerHTML = translations[lang].title;

    // 카테고리 텍스트 변경
    const categoryTexts = document.querySelectorAll(".category-center p");
    translations[lang].categories.forEach((text, index) => {
        categoryTexts[index].textContent = text;
    });

    // 비로그인 상태 UI 변경
    const authLinks = document.querySelectorAll("#logged-out-ui .auth-text a");
    authLinks[0].textContent = translations[lang].auth.loggedOut[0];
    authLinks[1].textContent = translations[lang].auth.loggedOut[1];

    // 로그인 상태 UI 변경
    const loggedInLinks = document.querySelectorAll("#logged-in-ui .auth-text a");
    loggedInLinks[0].textContent = translations[lang].auth.loggedIn[0];
    loggedInLinks[1].textContent = translations[lang].auth.loggedIn[1];

    // 매뉴얼 변경
    const manualTitle = document.querySelector(".manual h2");
    manualTitle.textContent = translations[lang].manual.title;
    const manualContent = document.querySelectorAll(".manual ul li");
    translations[lang].manual.content.forEach((text, index) => {
        manualContent[index].textContent = text;
    });

    // 채팅 UI 변경
    const chatSidebarTitle = document.querySelector(".chat-sidebar h2");
    chatSidebarTitle.textContent = translations[lang].chatSidebar;
    const chatPopupTitle = document.getElementById("popup-chat-title");
    chatPopupTitle.textContent = translations[lang].chatPopup;
    const chatPlaceholder = document.getElementById("popup-message-input");
    chatPlaceholder.placeholder = translations[lang].chatPlaceholder;
    const chatSendButton = document.querySelector(".chat-send-button");
    chatSendButton.textContent = translations[lang].chatSend;

    // 버튼 활성화 상태 조정
    document.getElementById("lang-ko").classList.toggle("active", lang === "ko");
    document.getElementById("lang-en").classList.toggle("active", lang === "en");
}
