import FormMessage from './formMessage';
document.getElementById('joinBtn').addEventListener('click', (e) => {
    e.preventDefault();
    const idInput = document.getElementById('idInput').value;
    const pwInput = document.getElementById('pwInput').value;
    const emailInput = document.getElementById('emailInput').value;
    const nameInput = document.getElementById('nameInput').value;

    fetch('/join', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: idInput,
        password: pwInput,
        email: emailInput,
        name: nameInput,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          window.location.href = "/login";
        } else {
          console.error('회원가입 실패:', data.message);
          const myError = new FormMessage('myError');
          myError.errMessage('회원가입 실패');
        }
      })
      .catch(error => console.error('에러 발생', error));
  });
  