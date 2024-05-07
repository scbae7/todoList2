const AcceptBtns = document.querySelectorAll('.adminAcceptBtn');
AcceptBtns.forEach(btn=>{
  btn.addEventListener('click',(e)=>{
    const reqId = e.target.parentElement.parentElement.dataset.userid;
    fetch('/admin/request/accept',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify({
        adminId:reqId
      })
    })
    .then(response => response.json())
    .then(data=>{
      if(data.success){
        window.location.reload();
      }else{
        console.error('수락 실패',data.message);
      }
    })
    .catch(error=>console.error('에러 발생',error));
  })
})