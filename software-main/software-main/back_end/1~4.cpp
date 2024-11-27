#include <iostream>
#include <unordered_map>
#include <string>
#include <vector>
#include <algorithm>
#include <fstream>

using namespace std;

// 사용자 클래스 정의
class User {
public:
    int uid; // 사용자 고유 ID
    string loginID; // 사용자 로그인 ID
    string nickName; // 사용자 닉네임
    string password; // 사용자 비밀번호
    string apiId; // 사용자 API ID (외부 인증용)
    bool isLogin; // 사용자 로그인 상태

    // 기본 생성자
    User() : uid(0), loginID(""), nickName(""), password(""), apiId(""), isLogin(false) {}

    // 매개변수가 있는 생성자
    User(int uid, string loginID, string nickName, string password, string apiId)
        : uid(uid), loginID(loginID), nickName(nickName), password(password), apiId(apiId), isLogin(false) {
    }
};

// 사용자 데이터베이스 시뮬레이션 (로그인 ID를 키로 사용)
unordered_map<string, User> users;
int userIdCounter = 1; // 사용자 ID를 위한 카운터

// 회원가입 함수
bool signUp(string loginID, string nickName, string password, string apiId = "") {
    // loginID 중복 검사
    if (users.find(loginID) != users.end()) {
        cout << "Error: The login ID is already taken." << endl;
        return false;
    }

    // nickName 중복 검사
    for (const auto& pair : users) {
        if (pair.second.nickName == nickName) {
            cout << "Error: The nickname is already taken." << endl;
            return false;
        }
    }

    // password 길이 검사 (4자리 이상이어야 함)
    if (password.length() < 4) {
        cout << "Error: The password must be at least 4 characters long." << endl;
        return false;
    }

    // 새로운 사용자 생성 및 데이터베이스에 추가
    User newUser(userIdCounter++, loginID, nickName, password, apiId);
    users[loginID] = newUser;

    cout << "Signup successful! Welcome, " << nickName << "!" << endl;
    return true;
}

// 로그인 함수 (로그인 ID와 비밀번호를 사용)
bool login(string loginID, string password) {
    // 사용자 찾기
    auto it = users.find(loginID);
    if (it == users.end()) {
        cout << "Error: User not found." << endl;
        return false;
    }

    User& user = it->second;
    // 비밀번호 일치 검사
    if (user.password == password) {
        user.isLogin = true;
        cout << "Login successful! Welcome back, " << user.nickName << "!" << endl;
        return true;
    }
    else {
        cout << "Error: Incorrect password." << endl;
        return false;
    }
}

// API 아이디를 이용한 로그인 함수
bool loginWithApiId(string apiId) {
    // 모든 사용자 탐색하여 API ID로 로그인 시도
    for (auto& pair : users) {
        User& user = pair.second;
        if (user.apiId == apiId) {
            user.isLogin = true;
            cout << "API Login successful! Welcome back, " << user.nickName << "!" << endl;
            return true;
        }
    }
    cout << "Error: API ID not found." << endl;
    return false;
}

// 로그아웃 함수
bool logout(string loginID) {
    // 사용자 찾기
    auto it = users.find(loginID);
    if (it == users.end()) {
        cout << "Error: User not found." << endl;
        return false;
    }

    User& user = it->second;
    // 로그인 상태 검사
    if (user.isLogin) {
        user.isLogin = false;
        cout << "Logout successful. Goodbye, " << user.nickName << "!" << endl;
        return true;
    }
    else {
        cout << "Error: User is not logged in." << endl;
        return false;
    }
}


class Vet { //동물병원 검색 함수
public:
    int VetID;
    string Vetname;
    string Vetaddress;
    string district;
    string VetphoneNumber;
    bool Vetopen24Hours;

    Vet(int id, string name, string address, string dist, string phone, bool open24)
        : VetID(id), Vetname(name), Vetaddress(address), district(dist), VetphoneNumber(phone), Vetopen24Hours(open24) {
    }
};

class VetSearch {
private:
    vector<Vet> vetDatabase; // 데이터베이스에서 동물병원 목록을 가져올 예정
    vector<Vet> searchVet;
    string selectedDistrict;
    bool is24HoursOnly;

public:
    VetSearch(const vector<Vet>& database) : vetDatabase(database), is24HoursOnly(false) {}

    void toggle24HoursFilter() {
        is24HoursOnly = !is24HoursOnly;
    }

    void setDistrictFilter(const string& district) {
        selectedDistrict = district;
    }

    void search() {
        searchVet.clear();
        for (const auto& vet : vetDatabase) {
            if (vet.district == selectedDistrict && (!is24HoursOnly || vet.Vetopen24Hours)) {
                searchVet.push_back(vet);
            }
        }
    }

    void getSearchVet() const {
        if (searchVet.empty()) {
            cout << "검색 결과가 없습니다." << endl;
        }
        else {
            for (const auto& vet : searchVet) {
                cout << "병원 이름: " << vet.Vetname << "\n주소: " << vet.Vetaddress
                    << "\n전화번호: " << vet.VetphoneNumber
                    << "\n24시간 운영 여부: " << (vet.Vetopen24Hours ? "예" : "아니오") << "\n" << endl;
            }
        }
    }
};
