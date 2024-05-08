document.querySelectorAll(".rowBtns .editBtn").forEach(button=>{
  button.addEventListener("click",(e)=>{
    console.log("버튼");
    const todoId = e.target.parentElement.parentElement.parentElement.getAttribute("data-todoId");
    const todoNum = e.target.parentElement.parentElement.parentElement.getAttribute("data-todoNum");
    const todoDesc = e.target.parentElement.parentElement.parentElement.getAttribute("data-todoDesc");
    const todoFile = e.target.parentElement.parentElement.parentElement.getAttribute("data-todoFile");
    const todoCont = e.target.parentElement.parentElement.parentElement.querySelector(".rowDesc").textContent;
    const todoTag = e.target.parentElement.parentElement.parentElement.querySelector(".rowTag").textContent;
    const todoDate = e.target.parentElement.parentElement.parentElement.querySelector(".rowDate").textContent;

    document.getElementById("detailTodoId").value = todoId;
    document.getElementById("detailTodoNum").value = todoNum;
    document.getElementById("detailTodoContent").value = todoCont;
    document.getElementById("detailTodoDueDate").value = todoDate;
    document.getElementById("detailTodoDesc").value = todoDesc;
    document.getElementById("detailTodoTag").value = todoTag;
    document.getElementById("detailTodoFile").value = todoFile;
  })
})