document.addEventListener('DOMContentLoaded', function() {
    const rowControls = document.querySelectorAll('.rowControl'); // 모든 rowControl 요소 선택

    // 각 rowControl 요소에 대해 클릭 이벤트 리스너 추가
    rowControls.forEach(function(control) {
        control.addEventListener('click', function() {
            const todoRow = control.closest('.todoRow'); // 클릭된 요소의 가장 가까운 부모 todoRow 요소 선택
            const todoNum = todoRow.getAttribute('data-todonum');
            console.log(todoNum)
            if (todoRow.classList.contains('waiting')) { // 대기 중 상태인 경우에만 처리
                // 서버로 요청 보내기
                fetch('/updateTodo', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      todoNum: todoNum, // 수정할 할 일 항목의 고유 식별자
                      newStatus: '완료' // 수정된 상태
                    })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('서버 응답 오류');
                    }
                    // 클라이언트 측에서 상태 업데이트 처리
                    todoRow.classList.remove('waiting'); // 대기 중 클래스 제거
                    todoRow.classList.add('done'); // 완료 클래스 추가
                    window.location.reload();
                })
                .catch(error => {
                    console.error('요청에 오류가 발생했습니다:', error);
                });
            }
        });
    });
});
