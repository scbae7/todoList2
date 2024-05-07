document.getElementById('findPwBtn').addEventListener('click', (e) => {
  e.preventDefault();
  console.log('dd')
  const idInput = document.getElementById('idInput').value;
  const emailInput = document.getElementById('emailInput').value;
  console.log(idInput,emailInput);
  fetch('/user/findPw', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: idInput,
      userEmail: emailInput,
    }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // window.location.href = "/todo";
        console.log('비밀번호 찾기 성공',data.message);
      } else {
        console.error('비밀번호 찾기 실패:', data.message);
        // 로그인 실패 메시지를 어딘가에 표시하거나 적절히 처리
      }
    })
    .catch(error => console.error('에러 발생', error));
});
