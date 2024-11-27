document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
        // 채팅 UI 로드
        fetch('chat.html')
            .then((response) => response.text())
            .then((html) => {
                const chatContainer = document.createElement('div');
                chatContainer.innerHTML = html;
                document.body.appendChild(chatContainer);

                // 채팅 로직 초기화
                initializeChat();
            })
            .catch((error) => console.error('채팅 로드 중 오류:', error));
    }
});
