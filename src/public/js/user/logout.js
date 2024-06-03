const logoutBtn = document.querySelector('.logout');
logoutBtn.addEventListener('click',()=>{
  fetch('/user/logout',{
    method:'POST',
  })
    .then(response => {
      if(response.ok){
        console.log('로그아웃 성공');
        window.location.reload();
        window.location.href = "/user/login";
      }else{
        console.error('로그아웃 실패');
      }
    })
    .catch(error=>console.error('에러발생',error));
})