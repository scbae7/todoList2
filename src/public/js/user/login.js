import FormMessage from './formMessage.js';
document.getElementById('loginBtn').addEventListener('click', (e) => {
  e.preventDefault();

  const idInput = document.getElementById('idInput').value;
  const pwInput = document.getElementById('pwInput').value;
  // const formMessage = document.querySelector('.formMessage');
  fetch('/user/login', {
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
        window.location.href = "/1";
      } else {
        console.error('로그인 실패:', data.message);
        // formMessage.textContent = `로그인 실패: ${data.message}`;
        const formMessage = new FormMessage('formMessage');
        formMessage.errMessage('로그인 실패',data);
      }
    })
    .catch(error => console.error('에러 발생', error));
});
