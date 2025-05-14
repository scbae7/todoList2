const dateBtns = document.querySelectorAll(".dateIcon");
dateBtns.forEach((dateBtn)=>{
  dateBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    console.log("click")
    let currentDate = new Date();
    let formattedDate = currentDate.toISOString().slice(0, 10);
    let inputField = dateBtn.closest('.inputRow').querySelector('input[name="todoDueDate"]');
    inputField.value = formattedDate;
  })
})
