document.addEventListener('DOMContentLoaded', function () {
    const todoRows = document.querySelectorAll('.todoRow'); // 할 일 항목들 선택

    // 페이지 로드 시 대기 중인 항목만 표시
    todoRows.forEach(function (row) {
        if (!row.classList.contains('waiting')) {
            row.style.display = 'none';
        }
    });

    const todoContButton = document.querySelector('.todoCont'); // TODO 버튼 선택
    const doneContButton = document.querySelector('.DoneCont'); // DONE 버튼 선택

    // TODO 버튼 클릭 시
    todoContButton.addEventListener('click', function () {
        todoRows.forEach(function (row) {
            if (row.classList.contains('done')) {
                row.style.display = 'none'; // '완료' 상태인 항목 숨김
            } else {
                row.style.display = 'block'; // '대기 중' 상태인 항목 표시
            }
        });
    });

    // DONE 버튼 클릭 시
    doneContButton.addEventListener('click', function () {
        todoRows.forEach(function (row) {
            if (row.classList.contains('done')) {
                row.style.display = 'block'; // '완료' 상태인 항목 표시
            } else {
                row.style.display = 'none'; // '대기 중' 상태인 항목 숨김
            }
        });
    });

    const todos = document.querySelectorAll('.todoRow'); // 모든 할 일 항목 가져오기
    const progressBar = document.getElementById('progressBar'); // 진행률 바
    const progressNumber = document.getElementById('progressNumber'); // 진행률 숫자 표시

    updateProgress(); // 페이지 로드시 진행률 업데이트

    function updateProgress() {
        const totalTodos = todos.length; // 전체 할 일 수
        let completedTodos = 0; // 완료된 할 일 수
        let progress = 0;

        todos.forEach(function (todo) {
            if (todo.classList.contains('done')) {
                completedTodos++;
            }
        });
        console.log("1"+completedTodos);
        console.log("2"+totalTodos);
        if(completedTodos<0 || totalTodos<0){
            progress = 0;
        }else{  
            progress = (completedTodos / totalTodos) * 100; // 진행률 계산
        }
        console.log(progress);
        barNumber.style.width = progress + '%'; // 진행률 바 업데이트
        progressNumber.textContent = Math.floor(progress) + '%'; // 진행률 숫자 업데이트
    }
})