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

    this.input.addEventListener('input', () => this.validate());

    this.input.form.addEventListener('submit', (event) => this.handleSubmit(event));
  }

  validate() {
    const value = this.input.value;
    const regex = new RegExp(this.pattern);

    if (!regex.test(value)) {
      this.input.setCustomValidity(this.errorMessage);
    } else {
      this.input.setCustomValidity('');
    }
    // 브라우저의 기본 폼 검증을 트리거하기 위해 유효성 검사를 다시 확인
    this.input.reportValidity();
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
    const regexConfig = [
      { id: 'idInput', pattern: '^[a-zA-Z가-힣0-9]{4,10}', errorMessage: '아이디는 4~10자의 한글과 영어, 숫자로만 입력해주세요.' },
      { id: 'pwInput', pattern: '^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})', errorMessage: '비밀번호는 문자, 숫자, 특수문자를 포함하여 6자 이상으로 입력해주세요.' },
      { id: 'emailInput', pattern: '^\\S+@\\S+\\.\\S+$', errorMessage: '유효한 이메일 주소를 입력하세요.' },
      { id: 'nameInput', pattern: '^[a-zA-Z가-힣\\s]{2,20}', errorMessage: '유효한 이름을 입력하세요.' }
    ];

    regexConfig.forEach(config => {
      const inputElement = document.getElementById(config.id);
      if (inputElement) {
        new RegEx(config.id, config.pattern, config.errorMessage);
        console.log(`${config.id} 있음`);
      }
    });
  }
}

const formValidator = new FormValidator("formValidator");
