import FormMessage from './formMessage.js';
import { FormValidator } from "../regEx3.js";
import {ConfirmModal} from "../confirmModal.js";

// 폼 유효성 검사 인스턴스 생성
const formValidator = new FormValidator("loginForm");

// 폼 제출 이벤트 처리
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault(); // 기본 제출 동작 방지
  handleSubmit();
});

// 로그인 버튼 클릭 이벤트 처리
document.getElementById('loginBtn').addEventListener('click', (e) => {
  e.preventDefault();
  handleSubmit();
});

function handleSubmit() {
  const allValid = formValidator.regexValidators.every(validator => validator.isValid());

  if (allValid) {
    const idInput = document.getElementById('idInput').value;
    const pwInput = document.getElementById('pwInput').value;

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
        window.location.href = "/todo/todoMain";
      } else {
        console.error('로그인 실패:', data.message);
        // const formMessage = new FormMessage('formMessage');
        // formMessage.errMessage('로그인 실패', data);
        const confirmModal = new ConfirmModal("confirmModal");
        confirmModal.showModalLink(data.message, true);
      }
    })
    .catch(error => console.error('에러 발생', error));
  } else {
    // console.log("폼 제출 실패");
    const confirmModal = new ConfirmModal("confirmModal");
    confirmModal.showModalLink("다시 한번 확인해주세요!", false);
  }
}
