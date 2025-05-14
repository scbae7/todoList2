import FormMessage from './formMessage.js';
import {
  ConfirmModal
} from "../confirmModal.js";

document.querySelector('.id-btn').addEventListener('click', (e) => {
  e.preventDefault();
  console.log('hi');
  handleSubmit();
});

function handleSubmit() {
    const idInput = document.getElementById('idInput').value;
    console.log('id:' + idInput);
    fetch('/user/idCheck', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: idInput,
        }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          const confirmModal = new ConfirmModal("confirmModal");
          confirmModal.showModalLink(data.message, false);
          // alert(data.message);
          console.log(data.message);

        } else {
          const confirmModal = new ConfirmModal("confirmModal");
          confirmModal.showModalLink(data.message, false);
          // alert(data.message);
          console.error('아이디 있음:', data.message);
          e.preventDefault();
          //로그인 실패 메시지를 어딘가에 표시하거나 적절히 처리
        }
      })
      .catch(error => console.error('에러 발생', error));
}