const todoRows = document.querySelectorAll('.todoRow');
console.log("todoDetail");
todoRows.forEach(todoRow=>{
  todoRow.addEventListener('click',()=>{
    document.querySelector('.modal.detailModal').style.display="block";
    document.getElementById('detailModal').style.display="block";
  })
})