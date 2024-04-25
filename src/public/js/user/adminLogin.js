import FormMessage from './formMessage.js';
document.getElementById('adminLoginBtn').addEventListener('click', (e) => {
  e.preventDefault();

  const idInput = document.getElementById('idInput').value;
  const pwInput = document.getElementById('pwInput').value;
  fetch('/admin/login', {
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
        console.error('관리자 로그인 실패:', data.message);
        const formMessage = new FormMessage('formMessage');
        formMessage.errMessage('관리자 로그인 실패',data);
      }
    })
    .catch(error => console.error('에러 발생', error));
});
