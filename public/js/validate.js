// import RegEx from './regEx.mjs';

// class FormValidator {
//   constructor(id) {
//     this.id = id;
//     this.validator();
//   }
//   validator() {
//     if (document.getElementById('idInput')) {
//       const idValidator = new RegEx('idInput', '^[a-zA-Z가-힣]{4,10}', '아이디는 4~10자의 한글과 영어로만 입력해주세요.');
//     }

//     if (document.getElementById('pwInput')) {
//       const pwValidator = new RegEx('pwInput', '^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})', '비밀번호는 문자, 숫자, 특수문자를 포함하여 6자 이상으로 입력해주세요.');
//       const pwConfirmInput = document.getElementById('pwConfirmInput');
//       const pwInput = document.getElementById('pwInput');

//       if(document.getElementById('pwConfirmInput')){
//         pwConfirmInput.addEventListener('input', () => {
//           const confirmValue = pwConfirmInput.value;
//           const pwValue = pwInput.value;
  
//           if (confirmValue !== pwValue) {
//             pwConfirmInput.setCustomValidity('비밀번호가 일치하지 않습니다.');
//           } else {
//             pwConfirmInput.setCustomValidity('');
//           }
//         });
//       }
//     }

//     if (document.getElementById('emailInput')) {
//       const emailValidator = new RegEx('emailInput', '^\\S+@\\S+\\.\\S+$', '유효한 이메일 주소를 입력하세요.');
//     }

//     if (document.getElementById('nameInput')) {
//       const nameValidator = new RegEx('nameInput', '^[a-zA-Z가-힣\\s]{2,20}', '유효한 이름을 입력하세요.');
//     }
//   }
// }
// new FormValidator('myValidator');