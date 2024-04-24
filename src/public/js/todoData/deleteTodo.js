document.querySelectorAll('.deleteTodoBtn').forEach(button=>{
    button.addEventListener('click',(event)=>{
        console.log('버튼')
        const todoNum = button.parentElement.getAttribute('data-todonum');
        console.log(todoNum);

        fetch(`/deleteTodo/${todoNum}`,{
            method:'delete',
          })
          .then(response=>{
            if(!response.ok){
              throw new Error('투두 삭제에 실패했습니다');
            }
            return response.json();
          })
          .then(data=>{
            console.log(data);
            window.location.reload();
          })
          .catch(error=>console.error('에러 발생:',error));
    })
})