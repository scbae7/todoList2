document.getElementById('addTodoBtn').addEventListener('click', (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('todoCont', document.getElementById('addTodoContent').value);
  formData.append('todoDate', document.getElementById('addTodoDueDate').value);
  formData.append('todoDesc', document.getElementById('addTodoDesc').value);
  formData.append('todoTag', document.getElementById('addTodoTag').value);
  formData.append('todoFile', document.getElementById('addTodoFile').files[0]); 
  formData.append('todoUserId', document.getElementById('todoUserId').dataset.todouserid);

  fetch('/todo/addTodo', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      window.location.href = "/todo/todoMain";
    } else {
      console.error('투두 추가 실패:', data.message);
    }
  })
  .catch(error => console.error('에러 발생', error));
});
