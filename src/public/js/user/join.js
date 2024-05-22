import FormMessage from './formMessage.js';
import {ConfirmModal} from "../confirmModal.js";

document.getElementById('joinBtn').addEventListener('click', (e) => {
    e.preventDefault();
    const idInput = document.getElementById('idInput').value;
    const pwInput = document.getElementById('pwInput').value;
    const emailInput = document.getElementById('emailInput').value;
    const nameInput = document.getElementById('nameInput').value;

    fetch('/user/join', {
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
          const confirmModal = new ConfirmModal("confirmModal");
          confirmModal.showModal();
          // window.location.href = "/user/login";
        } else {
          console.error('회원가입 실패:', data.message);
          const formMessage = new FormMessage('formMessage');
          formMessage.errMessage('회원가입 실패',data);
        }
      })
      .catch(error => console.error('에러 발생', error));
  });
  