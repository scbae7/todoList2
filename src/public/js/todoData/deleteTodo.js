import { updateProgress } from '../updatePro.js';
document.querySelectorAll('.deleteTodoBtn').forEach(button=>{
    button.addEventListener('click',(event)=>{
        console.log('버튼')
        const todoNum = button.parentElement.getAttribute('data-todonum');
        console.log(todoNum);

        fetch(`/todo/deleteTodo/${todoNum}`,{
            method:'post',
          })
          .then(response=>{
            if(!response.ok){
              throw new Error('투두 삭제에 실패했습니다');
            }
            return response.json();
          })
          .then(data=>{
            console.log(data);
            const deletedElement = button.parentElement; // 삭제된 항목의 부모 요소 선택
            deletedElement.remove(); // 선택된 요소를 DOM에서 완전히 제거합니다.
            updateProgress();
          })
          .catch(error=>console.error('에러 발생:',error));
    })
})