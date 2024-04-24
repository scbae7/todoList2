document.getElementById('resetPwBtn').addEventListener('click', (e) => {
  e.preventDefault();

  const pwInput = document.getElementById('pwInput').value;
  fetch('/resetPw', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      password: pwInput,
    }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // window.location.href = "/todo";
        console.log('비밀번호 재설정 성공')
      } else {
        console.error('비밀번호 재설정 실패:', data.message);
        // 로그인 실패 메시지를 어딘가에 표시하거나 적절히 처리
      }
    })
    .catch(error => console.error('에러 발생', error));
});
