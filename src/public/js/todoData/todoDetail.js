const todoRows = document.querySelectorAll('.todoRow');
console.log("todoDetail");
todoRows.forEach(todoRow=>{
  todoRow.addEventListener('click',(e)=>{
    e.preventDefault();
    const todoId = todoRow.getAttribute("data-todoId");
    const todoNum = todoRow.getAttribute("data-todoNum");
    const todoDesc = todoRow.getAttribute("data-todoDesc");
    const todoFile = todoRow.getAttribute("data-todoFile");
    const todoCont = todoRow.querySelector(".rowDesc").textContent;
    const todoTag = todoRow.querySelector(".rowTag").textContent;
    const todoDate = todoRow.querySelector(".rowDate").textContent;

    const trimmedDate = todoDate.replace(/\s/g, '');
    const formattedDate = trimmedDate.slice(0, -1);
    const finalFormattedDate = formattedDate.replace(/\./g, '-');
    console.log(finalFormattedDate);

    console.log("1:"+todoFile);
    const fixedTodoFile = todoFile.replace(/\\/g, "/");
    console.log("2:"+fixedTodoFile);
    const newFile = fixedTodoFile.replace(`src\/public/`, '../');
    console.log("3:"+newFile);
    
    // const encodedTodoFile = encodeURI(todoFile);
    // console.log(encodedTodoFile);
    // const newFile = encodedTodoFile.replace(/\\/g, "/");
    // console.log(newFile);

    document.getElementById("detailTodoId").value = todoId;
    document.getElementById("detailTodoNum").value = todoNum;
    document.getElementById("detailTodoContent").value = todoCont;
    document.getElementById("detailTodoDueDate").value = finalFormattedDate;
    document.getElementById("detailTodoDesc").value = todoDesc;
    document.getElementById("detailTodoTag").value = todoTag;
    document.getElementById("detailTodoFile").style.backgroundImage = `url(${newFile})`;

    document.querySelector('.modal.detailModal').style.display="block";
    document.getElementById('detailModal').style.display="block";


  })
})