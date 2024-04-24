// client.js

function updateProgress() {
    const todos = document.querySelectorAll('.todoRow'); // 모든 할 일 항목 가져오기
    const progressBar = document.getElementById('progressBar'); // 진행률 바
    const progressNumber = document.getElementById('progressNumber'); // 진행률 숫자 표시

    const totalTodos = todos.length; // 전체 할 일 수
    let completedTodos = 0; // 완료된 할 일 수

    todos.forEach(function (todo) {
        if (todo.classList.contains('done')) {
            completedTodos++;
        }
    });

    const progress = (completedTodos / totalTodos) * 100; // 진행률 계산
    console.log(progress);
    barNumber.style.width = progress + '%'; // 진행률 바 업데이트
    progressNumber.textContent = Math.floor(progress) + '%'; // 진행률 숫자 업데이트
}

export { updateProgress };
