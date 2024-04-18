document.getElementById('loginBtn').addEventListener('click', (e) => {
  e.preventDefault();

  const idInput = document.getElementById('idInput').value;
  const pwInput = document.getElementById('pwInput').value;
  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      // POST 요청으로 전송할 데이터
      username: idInput,
      password: pwInput,
    }),
  })
  .then(response => {
    if (response.ok) {
      // HTTP 상태 코드가 200 ~ 299 사이일 때 처리
      return response.json(); // 응답 내용을 JSON으로 파싱하여 반환
    } else {
      // HTTP 상태 코드가 200 ~ 299 사이가 아닐 때 처리
      throw new Error('HTTP Error ' + response.status);
    }
  })
  .then(data => {
    console.log(data);
    // 여기서 로그인이 성공했다고 가정하고, 성공 시에만 /todo 페이지로 이동
    window.location.href = "/todo";
  })
  .catch(error => {
    // 네트워크 오류 또는 HTTP 오류에 대한 처리
    console.error('에러 발생:', error);
  });
});
