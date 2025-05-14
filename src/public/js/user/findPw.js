import {
  ConfirmModal
} from "../confirmModal.js";
import {
  FormValidator
} from "../regEx3.js";

const formValidator = new FormValidator("findPwForm");

document.getElementById('findPwForm').addEventListener('submit', (e) => {
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
document.getElementById('findPwBtn').addEventListener('click', (e) => {
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

  if (allValid) {
    const idInput = document.getElementById('idInput').value;
    const emailInput = document.getElementById('emailInput').value;
    console.log(idInput, emailInput);
    fetch('/user/findPw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: idInput,
          userEmail: emailInput,
        }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // window.location.href = "/todo";
          const confirmModal = new ConfirmModal("confirmModal");
          confirmModal.showModalLink(data.message, true);
          console.log('비밀번호 찾기 성공', data.message);
        } else {
          const confirmModal = new ConfirmModal("confirmModal");
          confirmModal.showModalLink("비밀번호 찾기 실패", false);
          console.error('비밀번호 찾기 실패:', data.message);
          // 로그인 실패 메시지를 어딘가에 표시하거나 적절히 처리
        }
      })
      .catch(error => console.error('에러 발생', error));
  } else {
    // console.log("폼 제출 실패");
    const confirmModal = new ConfirmModal("confirmModal");
    confirmModal.showModalLink("다시 한번 확인해주세요!", false);
  }
}