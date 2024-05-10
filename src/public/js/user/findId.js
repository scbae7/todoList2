import ConfirmModal from "../confirmModal";
document.querySelector('.findIdBtn').addEventListener('click', (e) => {
  e.preventDefault();
  console.log('hi');

  const nameInput = document.getElementById('nameInput').value;
  const emailInput = document.getElementById('emailInput').value;
  console.log('n'+nameInput, 'e'+emailInput);
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
        console.log('아이디 찾기 성공',data.message);
        console.log(data);
      } else {
        console.error('아이디 찾기 실패:', data.message);
        //로그인 실패 메시지를 어딘가에 표시하거나 적절히 처리
      }
    })
    .catch(error => console.error('에러 발생', error));
});