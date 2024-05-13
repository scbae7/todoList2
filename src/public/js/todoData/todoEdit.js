document.querySelectorAll(".rowBtns .editBtn").forEach(button=>{
  button.addEventListener("click",(e)=>{
    e.preventDefault();
    e.stopPropagation();
    console.log("버튼");
    const todoId = e.target.parentElement.parentElement.parentElement.getAttribute("data-todoId");
    const todoNum = e.target.parentElement.parentElement.parentElement.getAttribute("data-todoNum");
    const todoDesc = e.target.parentElement.parentElement.parentElement.getAttribute("data-todoDesc");
    const todoFile = e.target.parentElement.parentElement.parentElement.getAttribute("data-todoFile");
    const todoCont = e.target.parentElement.parentElement.parentElement.querySelector(".rowDesc").textContent;
    const todoTag = e.target.parentElement.parentElement.parentElement.querySelector(".rowTag").textContent;
    const todoDate = e.target.parentElement.parentElement.parentElement.querySelector(".rowDate").textContent;

    const trimmedDate = todoDate.replace(/\s/g, '');
    const formattedDate = trimmedDate.slice(0, -1);
    const finalFormattedDate = formattedDate.replace(/\./g, '-');
    console.log(finalFormattedDate);

    let newFile = '';
    if(todoFile){
      console.log("1:"+todoFile);
      const fixedTodoFile = todoFile.replace(/\\/g, "/");
      console.log("2:"+fixedTodoFile);
      newFile = fixedTodoFile.replace(`src\/public/`, '../');
      console.log("3:"+newFile);
    }
    console.log(newFile)

    document.getElementById("editTodoId").value = todoId;
    document.getElementById("editTodoNum").value = todoNum;
    document.getElementById("editTodoContent").value = todoCont;
    document.getElementById("editTodoDueDate").value = finalFormattedDate;
    document.getElementById("editTodoDesc").value = todoDesc;
    document.getElementById("editTodoTag").value = todoTag;

    let editTodoFileView = document.getElementById("editTodoFileView")

    editTodoFileView.style.marginLeft = `100px`;
    editTodoFileView.style.width = `300px`;
    editTodoFileView.style.height = `300px`;
    editTodoFileView.style.backgroundSize = `cover`;
    editTodoFileView.style.backgroundRepeat = `cover`;
    editTodoFileView.style.backgroundImage = `url(${newFile})`;

    document.querySelector('.editModal').style.display = "block";
  })
})

document.getElementById('editTodoBtn').addEventListener('click', (e) => {
  e.preventDefault();
  console.log("수정");

  const formData = new FormData();
  formData.append('todoCont', document.getElementById('editTodoContent').value);
  formData.append('todoDate', document.getElementById('editTodoDueDate').value);
  formData.append('todoDesc', document.getElementById('editTodoDesc').value);
  formData.append('todoTag', document.getElementById('editTodoTag').value);
  formData.append('todoFile', document.getElementById('editTodoFile').files[0]);
  let oldTodoFile = null;
  if(oldTodoFile){
    oldTodoFile = document.getElementById("editTodoFileView").style.backgroundImage;
    let  newImg = oldTodoFile.match( /"([^"]+)"/)[1];
    console.log(newImg);
    let finalImg = newImg.replace(/\.\.\//, 'src/public/');
    console.log(finalImg);
    formData.append('oldTodoFile', finalImg); 
  }
  console.log(oldTodoFile);
  
  formData.append('todoUserId', document.getElementById('editTodoId').value);
  formData.append('todoNum', document.getElementById('editTodoNum').value);
  console.log(formData);

  fetch('/todo/editTodo', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      // window.location.href = "/todo/todoMain";
      window.location.reload();
    } else {
      console.error('투두 수정 실패:', data.message);
    }
  })
  .catch(error => console.error('에러 발생', error));
});