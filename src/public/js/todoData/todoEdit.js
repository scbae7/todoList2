import { ConfirmModal } from "../confirmModal.js";
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll(".rowBtns #editRow").forEach(button=>{
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
  
      const todoTags = Array.from(e.target.parentElement.parentElement.parentElement.querySelectorAll(".rowTagData"))
        .map(span => span.textContent)
        .join(', ');
      console.log(todoTags);
  
    
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
        
        let editTodoFileView = document.getElementById("editTodoFileView")
  
        document.querySelector("#editModal").style.height=`auto`;
  
        if (window.innerWidth <= 768) {
          editTodoFileView.style.marginTop = `10px`;
          editTodoFileView.style.marginLeft = `60px`;
          editTodoFileView.style.width = `200px`;
          editTodoFileView.style.height = `200px`;
        } else {
          editTodoFileView.style.marginTop = `20px`;
          editTodoFileView.style.marginLeft = `110px`;
          editTodoFileView.style.width = `300px`;
          editTodoFileView.style.height = `300px`;
        }
  
        
        editTodoFileView.style.backgroundSize = `cover`;
        editTodoFileView.style.backgroundRepeat = `cover`;
        editTodoFileView.style.backgroundImage = `url(${newFile})`;
      }else{
        document.querySelector("#editModal").style.height=`auto`;
        editTodoFileView.style.marginTop = ``;
        editTodoFileView.style.marginLeft = ``;
        editTodoFileView.style.width = ``;
        editTodoFileView.style.height = ``;
        editTodoFileView.style.backgroundSize = ``;
        editTodoFileView.style.backgroundRepeat = ``;
        editTodoFileView.style.backgroundImage = ``;
      }
      console.log(newFile)
  
      document.getElementById("editTodoId").value = todoId;
      document.getElementById("editTodoNum").value = todoNum;
      document.getElementById("editTodoContent").value = todoCont;
      document.getElementById("editTodoDueDate").value = finalFormattedDate;
      document.getElementById("editTodoDesc").value = todoDesc;
      document.getElementById("editTodoTag").value = todoTags;
  
      
  
      document.querySelector('.editModal').style.display = "block";
      
      e.stopPropagation();
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
        const confirmModal = new ConfirmModal("confirmTodoModal");
        confirmModal.showModal('다시 한번 확인해주세요!');
      }
    })
    .catch(error => {
      console.error('에러 발생', error);
      const confirmModal = new ConfirmModal("confirmTodoModal");
      confirmModal.showModal('다시 한번 확인해주세요!');
    });
  });
  
  document.getElementById('modalCloseBtn').addEventListener('click', () => {
    document.getElementById('confirmTodoModal').style.display = 'none';
  });
})
