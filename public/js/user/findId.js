document.getElementById('findIdBtn').addEventListener('click', (e) => {
  e.preventDefault();

  const nameInput = document.getElementById('nameInput').value;
  const emailInput = document.getElementById('emailInput').value;
  console.log(nameInput, emailInput);
  fetch('/findId', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userName: nameInput,
      email: emailInput,
    }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // window.location.href = "/todo";
        console.log('아이디 찾기 성공')
      } else {
        console.error('아이디 찾기 실패:', data.message);
        // 로그인 실패 메시지를 어딘가에 표시하거나 적절히 처리
      }
    })
    .catch(error => console.error('에러 발생', error));
});
