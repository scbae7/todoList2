document.getElementById('adminLoginBtn').addEventListener('click', (e) => {
  e.preventDefault();

  const idInput = document.getElementById('idInput').value;
  const pwInput = document.getElementById('pwInput').value;
  // admin/login
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: idInput,
      password: pwInput,
    }),
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        window.location.href = "/admin";
      } else {
        console.error('로그인 실패:', data.message);
        // 로그인 실패 메시지를 어딘가에 표시하거나 적절히 처리
      }
    })
    .catch(error => console.error('에러 발생', error));
});
