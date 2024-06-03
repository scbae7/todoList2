function updateProgress() {
    const progressNumber = document.getElementById('progressNumber'); // 진행률 바
    const barNumber = document.getElementById('barNumber'); // 진행률 숫자

    // if (!progressNumber || !barNumber) {
    //     console.error("Progress bar or progress number element not found");
    //     return;
    // }

    let todos = document.querySelectorAll('.todoRow'); // 모든 할 일 항목 가져오기
    const totalTodos = todos.length; // 전체 할 일 수
    let completedTodos = 0; // 완료된 할 일 수

    todos.forEach(function (todo) {
        if (todo.classList.contains('done')) {
            completedTodos++;
        }
    });

    console.log("Total todos: " + totalTodos);
    console.log("Completed todos: " + completedTodos);

    let progress = 0;

    if (totalTodos > 0) {
        progress = (completedTodos / totalTodos) * 100; // 진행률 계산
    }

    barNumber.style.width = progress + '%'; // 진행률 바 업데이트
    progressNumber.textContent = Math.floor(progress) + '%'; // 진행률 숫자 업데이트
}

export {
    updateProgress
};