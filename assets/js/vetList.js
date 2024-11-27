let hospitalData = []; // 병원 데이터 저장

// JSON 파일이나 API에서 데이터 로드
fetch('path/to/daegu_hospitals.json')
    .then(response => response.json())
    .then(data => {
        hospitalData = data; // 데이터 저장
        populateRegions();
    })
    .catch(error => console.error('Error loading hospital data:', error));

// 구/군 데이터 추가
function populateRegions() {
    const regions = [...new Set(hospitalData.map(hospital => hospital.region))];
    const regionSelect = document.getElementById('region-select');

    regions.forEach(region => {
        const option = document.createElement('option');
        option.value = region;
        option.textContent = region;
        regionSelect.appendChild(option);
    });
}

// 병원 데이터 표시
document.getElementById('region-select').addEventListener('change', (event) => {
    const selectedRegion = event.target.value;
    const hospitalTable = document.querySelector('.post-table tbody');

    hospitalTable.innerHTML = '';

    if (selectedRegion) {
        const filteredHospitals = hospitalData.filter(hospital => hospital.region === selectedRegion);

        filteredHospitals.forEach((hospital, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${hospital.name}</td>
                <td>${hospital.address}</td>
            `;
            hospitalTable.appendChild(row);
        });
    }
});

// 번역 버튼 이벤트 핸들러
document.getElementById('btn-ko').addEventListener('click', () => {
    translatePage('ko');
    setActiveLanguage('ko');
});

document.getElementById('btn-en').addEventListener('click', () => {
    translatePage('en');
    setActiveLanguage('en');
});

// 번역 함수
function translatePage(language) {
    const translations = {
        ko: {
            'header-lost': '실종',
            'header-found': '발견',
            'header-protect': '임시보호',
            'header-vet': '동물병원',
            'login': '로그인',
            'signup': '회원가입',
        },
        en: {
            'header-lost': 'Lost',
            'header-found': 'Found',
            'header-protect': 'Temporary Protection',
            'header-vet': 'Veterinary Clinic',
            'login': 'Login',
            'signup': 'Sign Up',
        }
    };

    // 모든 data-translate 요소에 대해 번역 적용
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[language][key]) {
            const img = element.querySelector('img');
            if (img) {
                // 텍스트 노드만 수정
                Array.from(element.childNodes).forEach(node => {
                    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
                        node.textContent = translations[language][key];
                    }
                });
            } else {
                // 단순 텍스트 변경
                element.textContent = translations[language][key];
            }
        }
    });
}

// 초기 번역 적용
document.addEventListener('DOMContentLoaded', () => {
    const initialLang = 'ko'; // 기본 언어를 설정
    translatePage(initialLang);
    setActiveLanguage(initialLang);
});

// 활성 언어 버튼 스타일 설정
function setActiveLanguage(language) {
    document.getElementById('btn-ko').classList.toggle('active', language === 'ko');
    document.getElementById('btn-en').classList.toggle('active', language === 'en');
}