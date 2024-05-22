class RegEx {
  constructor(id, pattern, errorMessage) {
    this.inputId = id;
    this.pattern = pattern;
    this.errorMessage = errorMessage;

    this.input = document.getElementById(id);

    if (!this.input) {
      console.error(`${id} 없음`);
      return;
    }

    this.input.addEventListener('input', this.validate.bind(this));
    this.input.form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  validate() {
    const value = this.input.value;
    console.log(this.input.value)
    const regex = new RegExp(this.pattern);

    if (!regex.test(value)) {
      this.input.setCustomValidity(this.errorMessage);
      console.log(this.errorMessage)

    } else {
      this.input.setCustomValidity('');
    }
  }

  handleSubmit(event) {
    const value = this.input.value;
    const regex = new RegExp(this.pattern);

    if (!regex.test(value)) {
      event.preventDefault();
    }
  }
}
class FormValidator {
  constructor(id) {
    this.id = id;
    this.validator();
  }

  validator() {
    if (document.getElementById('idInput')) {
      new RegEx('idInput', '^[a-zA-Z가-힣0-9]{4,10}', '아이디는 4~10자의 한글과 영어, 숫자로만 입력해주세요.');
    }

    if (document.getElementById('pwInput')) {
      new RegEx('pwInput', '^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})', '비밀번호는 문자, 숫자, 특수문자를 포함하여 6자 이상으로 입력해주세요.');
      const pwConfirmInput = document.getElementById('pwConfirmInput');
      const pwInput = document.getElementById('pwInput');

      if (pwConfirmInput) {
        pwConfirmInput.addEventListener('input', () => {
          const confirmValue = pwConfirmInput.value;
          const pwValue = pwInput.value;

          if (confirmValue !== pwValue) {
            pwConfirmInput.setCustomValidity('비밀번호가 일치하지 않습니다.');
          } else {
            pwConfirmInput.setCustomValidity('');
          }
        });
      }
    }

    if (document.getElementById('emailInput')) {
      new RegEx('emailInput', '^\\S+@\\S+\\.\\S+$', '유효한 이메일 주소를 입력하세요.');
    }

    if (document.getElementById('nameInput')) {
      new RegEx('nameInput', '^[a-zA-Z가-힣\\s]{2,20}', '유효한 이름을 입력하세요.');
    }
  }
}
new FormValidator();