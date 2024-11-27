// 동적 병원 데이터 필터링 (예: 동물병원 페이지에서 사용)
function filterHospitals(district, subDistrict) {
    const hospitalData = [
        { name: "동물병원1", address: "대구광역시 동구 신암1동", is24: false },
        { name: "동물병원2", address: "대구광역시 동구 신암2동", is24: true },
    ];

    const filtered = hospitalData.filter(hospital => {
        return hospital.address.includes(district) && hospital.address.includes(subDistrict);
    });

    const resultSection = document.getElementById('hospital-results');
    resultSection.innerHTML = filtered.map(hospital => `
        <tr>
            <td>${hospital.name}</td>
            <td>${hospital.address}</td>
        </tr>
    `).join('');
}