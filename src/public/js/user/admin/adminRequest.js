const notiBtn = document.querySelector('.adNoti');
notiBtn.addEventListener('click',()=>{
    console.log('dd');
    const modal = document.querySelector('.modal#requestModal');
    modal.style.display = "block";
})