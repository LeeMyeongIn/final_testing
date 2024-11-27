document.addEventListener('DOMContentLoaded', function () {
    const chatSection = document.getElementById('chat-section');

    // 로그인 상태 확인 (로컬 스토리지에 로그인 여부 저장됨)
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
        // 로그인한 상태면 채팅 섹션 표시
        chatSection.classList.remove('hidden');
    } else {
        // 로그인하지 않은 상태면 채팅 섹션 숨김
        chatSection.classList.add('hidden');
    }
});
