import {
  ConfirmModal
} from "../confirmModal.js";
import {
  RegEx, FormValidator
} from "../regEx3.js";
import FormMessage from "./formMessage.js";

const currentPwValidator = new RegEx('currentPwInput', '^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,10}$', '현재 비밀번호는 문자, 숫자, 특수문자를 포함하여 6자 이상으로 입력해주세요.');
const newPwValidator = new RegEx('newPwInput', '^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,10}$', '새 비밀번호는 문자, 숫자, 특수문자를 포함하여 6자 이상으로 입력해주세요.');
const pwConfirmValidator = new RegEx('pwConfirmInput', '^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,10}$', '새 비밀번호 확인은 문자, 숫자, 특수문자를 포함하여 6자 이상으로 입력해주세요.');

const formValidator = new FormValidator("resetPwForm");
formValidator.regexValidators.push(currentPwValidator, newPwValidator, pwConfirmValidator);

document.getElementById('resetPwForm').addEventListener('submit', (e) => {
  e.preventDefault();
  handleSubmit();
});

document.getElementById('resetPwBtn').addEventListener('click', (e) => {
  e.preventDefault();
  handleSubmit();
});

function handleSubmit() {
  const allValid = formValidator.regexValidators.every(validator => validator.isValid());

  if (allValid) {
    const currentPassword = document.getElementById('currentPwInput').value;
    const newPassword = document.getElementById('newPwInput').value;
    const confirmPassword = document.getElementById('pwConfirmInput').value;

    if (newPassword !== confirmPassword) {
      const formMessage = new FormMessage('formMessage');
      formMessage.errMessage('비밀번호 재설정 실패', { message: '새 비밀번호와 확인 비밀번호가 일치하지 않습니다.' });
      return;
    }


    fetch('/user/resetPw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: currentPassword,
          newPassword: newPassword,
        }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // window.location.href = "/todo";
          const confirmModal = new ConfirmModal("confirmModal");
          confirmModal.showModal(data.message);
          console.log('비밀번호 재설정 성공',data.message);
        } else {
          console.error('비밀번호 재설정 실패:', data.message);
          // 로그인 실패 메시지를 어딘가에 표시하거나 적절히 처리
        }
      })
      .catch(error => console.error('에러 발생', error));
  } else {
    console.log("폼 제출 실패");
  }
}