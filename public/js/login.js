document.getElementById('loginBtn').addEventListener('click',(e)=>{
  e.preventDefault()

  const idInput = document.getElementById('idInput').value;
  const pwInput = document.getElementById('pwInput').value;
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      // POST 요청으로 전송할 데이터
      username: idInput,
      password: pwInput,
    }),
  })
  .then(response => {
    if (response.ok) {
      // POST 요청이 성공한 경우 처리
      console.log('Join successful');
    } else {
      // POST 요청이 실패한 경우 처리
      console.error('Join failed');
    }
  })
  .catch(error => {
    // 네트워크 오류 등으로 인한 실패 처리
    console.error('Error:', error);
  });
  
})