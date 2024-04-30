document.getElementById('addTodoBtn').addEventListener('click', (e) => {
    e.preventDefault();
    const addTodoContent = document.getElementById('addTodoContent').value;
    const addTodoDueDate = document.getElementById('addTodoDueDate').value;
    const addTodoDesc = document.getElementById('addTodoDesc').value;
    const addTodoTag = document.getElementById('addTodoTag').value;
    const addTodoFile = document.getElementById('addTodoFile').value;
    const addTodoSound = document.getElementById('addTodoSound').value;
    const todoUserId = document.getElementById('todoUserId').dataset.todouserid;

    fetch('/todo/addTodo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        todoCont: addTodoContent,
        todoDate: addTodoDueDate,
        todoDesc: addTodoDesc,
        todoTag: addTodoTag,
        todoFile: addTodoFile,
        todoSound: addTodoSound,
        todoUserId: todoUserId,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          window.location.href = "/todo/todoMain";
          // window.location.reload();
        } else {
          console.error('투두 추가 실패:', data.message);
        }
      })
      .catch(error => console.error('에러 발생', error));
});