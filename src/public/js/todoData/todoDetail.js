const todoRows = document.querySelectorAll('.todoRow');
console.log("todoDetail");
todoRows.forEach(todoRow=>{
  todoRow.addEventListener('click',(e)=>{
    e.preventDefault();
    console.log(todoRow);
    console.log("todoRow클릭")
    const todoId = todoRow.getAttribute("data-todoId");
    const todoNum = todoRow.getAttribute("data-todoNum");
    const todoDesc = todoRow.getAttribute("data-todoDesc");
    const todoFile = todoRow.getAttribute("data-todoFile");
    const todoCont = todoRow.querySelector(".rowDesc").textContent;
    const todoTag = todoRow.querySelector(".rowTag").textContent;
    const todoDate = todoRow.querySelector(".rowDate").textContent;



    let newFile = '';
    if(todoFile){
      console.log("1:"+todoFile);
      const fixedTodoFile = todoFile.replace(/\\/g, "/");
      console.log("2:"+fixedTodoFile);
      newFile = fixedTodoFile.replace(`src\/public/`, '../');
      console.log("3:"+newFile);

      let detailTodoFile = document.getElementById("detailTodoFile")
   
      
      document.querySelector('#detailModal').style.height=`780px`;
      detailTodoFile.style.marginLeft = `100px`;
      detailTodoFile.style.width = `300px`;
      detailTodoFile.style.height = `300px`;
      detailTodoFile.style.backgroundSize = `cover`;
      detailTodoFile.style.backgroundRepeat = `cover`;
      detailTodoFile.style.backgroundImage = `url(${newFile})`;
      document.querySelector('.detailModal').style.display="block";
      
    }else{
      document.querySelector('#detailModal').style.height = `490px`;
      detailTodoFile.style.marginLeft = '';
      detailTodoFile.style.width = '';
      detailTodoFile.style.height = '';
      detailTodoFile.style.backgroundSize = '';
      detailTodoFile.style.backgroundRepeat = '';
      detailTodoFile.style.backgroundImage = '';
    }
    document.querySelector('.detailModal').style.display="block";


    const trimmedDate = todoDate.replace(/\s/g, '');
    const formattedDate = trimmedDate.slice(0, -1);
    const finalFormattedDate = formattedDate.replace(/\./g, '-');
    console.log(finalFormattedDate);

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
  })
})