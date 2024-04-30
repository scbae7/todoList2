const todoRows = document.querySelectorAll('.todoRow');
todoRows.forEach(todoRow=>{
  todoRow.addEventListener('click',()=>{
    document.querySelector('.modal').style.display="block";
    document.getElementById('detailModal').style.display="block";
    
  })
})