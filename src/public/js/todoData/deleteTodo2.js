import { ConfirmModal } from "../confirmModal.js";
import { updateProgress } from '../updatePro.js';

document.querySelectorAll('.deleteBtn').forEach(button => {
    button.addEventListener('click', (event) => {
        event.stopPropagation();
        const todoNum = button.parentElement.parentElement.parentElement.getAttribute('data-todonum');
        let todoFile = null;
        let todoFileAttribute = button.parentElement.parentElement.parentElement.getAttribute("data-todoFile");

        if (todoFileAttribute) {
            todoFileAttribute = button.parentElement.parentElement.parentElement.getAttribute("data-todoFile");
        }
        if (todoFileAttribute) {
            todoFile = todoFileAttribute;;
        }

        const confirmModal = new ConfirmModal("confirmModal");
        confirmModal.showModal("정말로 삭제하시겠습니까?");

        const deleteUserBtn = document.querySelector('.deleteTodo');
        deleteUserBtn.addEventListener('click', async () => {
            let requestBody = {
                todoNum: todoNum
            };

            if (todoFile) {
                requestBody.todoFile = todoFile;
            }

            try {
                const response = await fetch(`/todo/deleteTodo/${todoNum}`, {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        requestBody
                    }),
                });

                const result = await response.json();
                if (result.success) {
                    const deletedElement = button.parentElement.parentElement.parentElement;
                    deletedElement.remove();
                    updateProgress();
                } else {
                    console.error('삭제 실패:', result.message);
                    alert('삭제에 실패했습니다.');
                }
            } catch (error) {
                console.error('에러 발생:', error);
                alert('서버 오류');
            }
        });
    });
});
