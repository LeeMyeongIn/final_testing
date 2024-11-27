#include <mysql_driver.h>  // MySQL 드라이버 헤더 파일 포함
#include <mysql_connection.h>  // MySQL 연결 관련 헤더 파일 포함
#include <cppconn/statement.h>  // SQL 문을 실행하기 위한 헤더 파일 포함
#include <cppconn/resultset.h>  // SQL 쿼리 결과를 처리하기 위한 헤더 파일 포함
#include <cppconn/exception.h>  // SQL 예외 처리를 위한 헤더 파일 포함
#include <iostream>  // 입출력을 위한 헤더 파일 포함
#include <string>  // 문자열 처리를 위한 헤더 파일 포함
#include <vector>  // 벡터 사용을 위한 헤더 파일 포함
#include <unordered_map>  // 해시 맵 자료구조를 사용하기 위한 헤더 파일 포함
#include <ctime>  // 시간 관련 기능을 사용하기 위한 헤더 파일 포함
#include <algorithm>  // 정렬을 위한 헤더 파일 포함

using namespace std;

// chatStart 클래스: 댓글을 통해 채팅을 시작하는 기능 관리
class ChatStart {
private:
    int commentID;  // 댓글의 고유 ID
    int chatID;  // 채팅창의 고유 ID
    string senderID;  // 메시지를 보낸 사용자의 ID
    string receiverID;  // 메시지를 받은 사용자의 ID
    vector<string> messages;  // 채팅창에 포함된 메시지 목록
    bool isActive;  // 채팅의 활성화 여부

public:
    // chatStart 클래스 생성자: 각 속성을 초기화
    ChatStart(int cmtID, int cID, const string& sender, const string& receiver)
        : commentID(cmtID), chatID(cID), senderID(sender), receiverID(receiver), isActive(true) {}

    // 채팅창을 종료하는 메소드
    void closeChat() {
        isActive = false;
        cout << "채팅창 ID: " << chatID << "가 종료되었습니다." << endl;
    }

    // 주어진 사용자가 이미 대화중인지 확인하는 메소드
    bool isUserAlreadyInChat(const string& user) {
        return (user == senderID || user == receiverID) && isActive;
    }
};

// chatDelete 클래스: 채팅창 삭제 기능 관리
class ChatDelete {
private:
    int chatID;  // 삭제할 채팅방의 고유 ID
    int uid;  // 현재 사용자의 고유 ID
    vector<ChatStart> chatList;  // 사용자의 모든 채팅 목록

public:
    // 채팅 삭제 확인 팝업을 띄우고 삭제를 확인하면 True, 취소하면 False 반환
    bool confirmChatDelete(int chatID) {
        cout << "채팅방 ID: " << chatID << "를 삭제하시겠습니까? (예/아니오): ";
        string response;
        cin >> response;
        return (response == "예");
    }

    // 지정된 채팅방을 삭제하고 성공 여부를 반환
    bool deleteChat(int chatID) {
        auto it = remove_if(chatList.begin(), chatList.end(), [chatID](ChatStart& chat) {
            return chatID == chatID;
            });
        if (it != chatList.end()) {
            chatList.erase(it, chatList.end());
            cout << "채팅방 ID: " << chatID << "이(가) 삭제되었습니다." << endl;
            return true;
        }
        return false;
    }

    // 채팅 삭제 취소 시 호출, 동작 X
    void cancelDelete() {
        cout << "채팅 삭제가 취소되었습니다." << endl;
    }

    // 채팅 삭제 완료 후 호출되며, UI에서 해당하는 채팅창을 삭제하는 작업 수행
    void onChatDeleteSuccess(int chatID) {
        cout << "채팅방 ID: " << chatID << "가 성공적으로 UI에서 삭제되었습니다." << endl;
    }
};

// chatting 클래스: 채팅을 주고 받는 기능 관리
class Chatting {
private:
    int chatID;  // 채팅방의 고유 ID
    int messageID;  // 메시지의 고유 ID
    string content;  // 메시지 내용
    time_t timestamp;  // 메시지가 전송된 시간
    string senderID;  // 메시지를 보낸 사용자의 ID
    string receiverID;  // 메시지를 받은 사용자의 ID

public:
    // 메시지를 전송하는 메소드
    int sendMessage(int chatID, const string& senderID, const string& content) {
        this->chatID = chatID;
        this->senderID = senderID;
        this->content = content;
        this->timestamp = time(nullptr);
        cout << "메시지가 전송되었습니다: " << content << endl;
        return ++messageID;
    }

    // 주어진 채팅방의 모든 메시지 기록을 반환하는 메소드
    vector<string> getChatHistory(int chatID) {
        // 채팅방에 대한 모든 메시지 반환 (단순히 예시용으로 메시지 목록 반환)
        vector<string> messages = { "안녕하세요", "테스트 메시지입니다" };
        return messages;
    }

    // 채팅방의 마지막 메시지 전송 시간을 반환하는 메소드
    time_t getChatTimestamp(int chatID) {
        return timestamp;
    }
};

// systemChat 클래스: 시스템 채팅 관리
class SystemChat {
private:
    int systemChatID;  // 시스템 채팅방의 고유 ID
    vector<string> notifications;  // 댓글 알림 및 신고 알림을 저장하는 리스트
    time_t lastMessageTime;  // 마지막 메시지가 보내진 시간

public:
    // 알림을 전송하는 메소드
    void sendNotifications(const string& message) {
        notifications.push_back(message);
        lastMessageTime = time(nullptr);
        cout << "알림: " << message << "이(가) 시스템 채팅방에 전송되었습니다." << endl;
    }

    // 채팅에 읽지 않은 메시지가 있는지 확인하고, True 혹은 False 반환
    bool getUnreadStatus() {
        return !notifications.empty();
    }

    // 메시지를 채팅창에 추가하고 메시지 ID 반환
    int sendMessage(const string& content, time_t timestamp) {
        cout << "새 메시지: " << content << "이(가) 전송되었습니다. 시간: " << ctime(&timestamp);
        return ++systemChatID;
    }

    // 채팅창을 새로고침해 최신 메시지 표시
    void refreshChat() {
        cout << "채팅이 새로고침되었습니다." << endl;
    }

    // 현재 채팅창에 메시지와 전송 시간을 표시
    void displayMessages() {
        for (const string& message : notifications) {
            cout << "알림 메시지: " << message << endl;
        }
    }
};

// CumulativeCount 클래스: 사용자 신고 누적 횟수 관리
class CumulativeCount {
private:
    string userID;  // 사용자 ID (피신고자 식별)
    int reportCount;  // 신고 누적 횟수를 나타내는 변수

public:
    // 신고 횟수를 1씩 증가하는 메소드
    int incrementReportCount() {
        return ++reportCount;
    }
};

// AccountRestriction 클래스: 사용자 신고로 인해 로그인 제재를 관리
class AccountRestriction {
private:
    int restrictionNum;  // 제재의 고유 번호
    string reportedUserID;  // 제재 대상 사용자 ID
    string restrictionReason;  // 제재 사유
    time_t startDate;  // 제재 시작 날짜
    time_t endDate;  // 제재 종료 날짜
    bool isPermanent;  // 영구 제재 여부

public:
    // 특정 사용자에게 제재 적용
    bool applyRestriction(const string& userID, const string& reportReason, int duration) {
        this->reportedUserID = userID;
        this->restrictionReason = reportReason;
        this->startDate = time(nullptr);
        this->endDate = startDate + duration * 24 * 60 * 60;
        this->isPermanent = (duration == -1);
        cout << "사용자 " << userID << "에게 제재가 적용되었습니다. 사유: " << reportReason << endl;
        return true;
    }

    // 특정 사용자에게 제재 해제
    bool liftRestriction(int restrictionNum) {
        cout << "제재 번호 " << restrictionNum << "에 대한 제재가 해제되었습니다." << endl;
        return true;
    }
};
