import FormMessage from './formMessage.js';
import {ConfirmModal} from "../confirmModal.js";
import {FormValidator } from '../regEx3.js';

const formValidator = new FormValidator("joinForm");

document.getElementById('joinForm').addEventListener('submit', (e) => {
  e.preventDefault();
  var response = grecaptcha.getResponse();
  if (!response || response.length === 0) {
      const confirmModal = new ConfirmModal("confirmModal");
      confirmModal.showModalLink("캡챠를 완료해주세요!", false);
      e.preventDefault(); // 기본 제출 동작 방지
      return;
  }
  handleSubmit();
});

document.getElementById('joinBtn').addEventListener('click', (e) => {
  e.preventDefault();
  var response = grecaptcha.getResponse();
  if (!response || response.length === 0) {
      const confirmModal = new ConfirmModal("confirmModal");
      confirmModal.showModalLink("캡챠를 완료해주세요!", false);
      e.preventDefault(); // 기본 제출 동작 방지
      return;
  }
  handleSubmit();
});

function handleSubmit() {
  const allValid = formValidator.regexValidators.every(validator => validator.isValid());
  if(allValid){
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
          confirmModal.showModalLink(`회원가입이 성공적으로 완료되었습니다.`, true);
          // window.location.href = "/user/login";
        } else {
          console.error('회원가입 실패:', data.message);
          const formMessage = new FormMessage('formMessage');
          formMessage.errMessage('회원가입 실패',data);
        }
      })
      .catch(error => console.error('에러 발생', error));
  }else{
    // console.log("폼 제출 실패");
    const confirmModal = new ConfirmModal("confirmModal");
    confirmModal.showModalLink("다시 한번 확인해주세요!", false);
  }
}

  