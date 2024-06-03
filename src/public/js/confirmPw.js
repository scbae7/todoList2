document.getElementById('pwInput').addEventListener('input', validatePasswordConfirm);
document.getElementById('pwConfirmInput').addEventListener('input', validatePasswordConfirm);
console.log("confirm")
function validatePasswordConfirm() {
  const passwordInput = document.getElementById('pwInput');
  const passwordConfirmInput = document.getElementById('pwConfirmInput');

  if (passwordConfirmInput) {
    console.log("2");
    const password = passwordInput.value;
    const passwordConfirm = passwordConfirmInput.value;

    if (password !== passwordConfirm) {
      passwordConfirmInput.setCustomValidity('비밀번호가 일치하지 않습니다.');
    } else {
      passwordConfirmInput.setCustomValidity('');
    }

    passwordConfirmInput.reportValidity();
  }
}