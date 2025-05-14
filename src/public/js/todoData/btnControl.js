const rowControls = document.querySelectorAll('.todoRow .rowControl');
rowControls.forEach(rowControl => {
  rowControl.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("rowControl 클릭");
    const rowBtns = rowControl.parentElement.querySelector(".rowBtns");
    if (rowBtns) {
      rowBtns.style.display = "flex";
      rowControl.style.display = "none";
    }
  });
});

const closeBtns = document.querySelectorAll('.todoRow #closeRow');
closeBtns.forEach(closeBtn => {
  closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("closeBtn 클릭");
    const rowBtns = closeBtn.closest(".rowBtns");
    const rowControl = rowBtns.parentElement.querySelector(".rowControl");
    if (rowBtns) {
      rowBtns.style.display = "none";
      if (rowControl) {
        rowControl.style.display = "block";
      }
    }
  });
});
