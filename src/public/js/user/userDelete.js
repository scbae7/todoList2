import {
  ConfirmModal
} from "../confirmModal.js";

document.addEventListener('DOMContentLoaded', () => {
  const openModalBtn = document.getElementById('openModalBtn');
  const modal = document.querySelector('.modal.deleteModal');
  const cancelBtn = document.querySelector('.cancelBtn');
  const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
  const form = document.getElementById('userDeleteForm');

  openModalBtn.addEventListener('click', () => {
    console.log("clcick")
    modal.classList.remove('hidden');
    modal.style.display="block";
  });

  cancelBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    modal.style.display="none";
  });

  confirmDeleteBtn.addEventListener('click', async () => {
    const formData = new FormData(form);
    const data = {
      userId: formData.get('idInput'),
      userPw: formData.get('pwInput')
    };

    try {
      const response = await fetch('/user/userDelete', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();
      if (result.success) {
        // alert(result.message);
        const confirmModal = new ConfirmModal("confirmModal");
        confirmModal.showModal(result.message);
        modal.style.display="none";
      } else {
        const confirmModal = new ConfirmModal("confirmModal");
        confirmModal.showModal(result.message);
        modal.style.display="none";
      }
    } catch (err) {
      console.error('에러 발생:', err);
      alert('서버 오류');
    }
  });
});
