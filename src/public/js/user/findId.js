import {
  ConfirmModal
} from "../confirmModal.js";
import {
  FormValidator
} from "../regEx3.js";

const formValidator = new FormValidator("findIdForm");

document.getElementById('findIdForm').addEventListener('submit', (e) => {
  e.preventDefault(); // 기본 제출 동작 방지
  handleSubmit();
});

document.querySelector('.findIdBtn').addEventListener('click', (e) => {
  e.preventDefault();
  console.log('hi');
  handleSubmit();
});

function handleSubmit() {
  const allValid = formValidator.regexValidators.every(validator => validator.isValid());

  if (allValid) {
    const nameInput = document.getElementById('nameInput').value;
    const emailInput = document.getElementById('emailInput').value;
    console.log('n' + nameInput, 'e' + emailInput);
    fetch('/user/findId', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userName: nameInput,
          userEmail: emailInput,
        }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // window.location.href = "user/login";
          const confirmModal = new ConfirmModal("confirmModal");
          confirmModal.showModal(data.message);
          console.log('아이디 찾기 성공', data.message);
          console.log(data);
        } else {
          console.error('아이디 찾기 실패:', data.message);
          //로그인 실패 메시지를 어딘가에 표시하거나 적절히 처리
        }
      })
      .catch(error => console.error('에러 발생', error));
  } else {
    console.log("폼 제출 실패");
  }
}