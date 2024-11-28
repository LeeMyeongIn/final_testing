// 채팅 창 열기
function openChat(userId) {
    // 모든 채팅 창을 숨기기
    const chatWindows = document.querySelectorAll('.chat-window');
    chatWindows.forEach((window) => {
        window.classList.add('hidden');
    });

    // 선택한 채팅 창만 표시
    const chatWindow = document.getElementById(`chat-${userId}`);
    if (chatWindow) {
        chatWindow.classList.remove('hidden');
    }
}

// 메시지 전송
function sendMessage(userId) {
    const textarea = document.getElementById(`message-${userId}`);
    const message = textarea.value.trim();
    const messageContainer = document.querySelector(`#chat-${userId} .messages`);

    if (message) {
        // 새 메시지 추가
        const newMessage = document.createElement('div');
        newMessage.textContent = `나: ${message}`;
        newMessage.style.marginBottom = '10px';

        messageContainer.appendChild(newMessage);
        messageContainer.scrollTop = messageContainer.scrollHeight; // 스크롤을 맨 아래로 이동

        // 입력 필드 초기화
        textarea.value = '';
    }
}
