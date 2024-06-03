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

    if (this.input && this.input.form) {
      this.input.form.addEventListener('submit', (event) => this.handleSubmit(event));
    }
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

  isValid() {
    const regex = new RegExp(this.pattern);
    return regex.test(this.input.value);
  }
}

class FormValidator {
  constructor(formId) {
    this.form = document.getElementById(formId);
    if (!this.form) {
      console.error(`Form with id ${formId} not found.`);
      return;
    }

    this.regexValidators = [];
    this.validator();

    this.form.addEventListener('submit', (event) => this.handleFormSubmit(event));
  }

  validator() {
    const regexConfig = [
      { id: 'idInput', pattern: '^[a-zA-Z가-힣0-9]{4,10}$', errorMessage: '아이디는 4~10자의 한글과 영어, 숫자로만 입력해주세요.' },
      { id: 'pwInput', pattern: '^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,10}$', errorMessage: '비밀번호는 문자, 숫자, 특수문자를 포함하여 6자 이상으로 입력해주세요.' },
      { id: 'emailInput', pattern: '^\\S+@\\S+\\.\\S+$', errorMessage: '유효한 이메일 주소를 입력하세요.' },
      { id: 'nameInput', pattern: '^[a-zA-Z가-힣\\s]{2,20}$', errorMessage: '유효한 이름을 입력하세요.' }
    ];

    regexConfig.forEach(config => {
      const inputElement = document.getElementById(config.id);
      if (inputElement) {
        const validator = new RegEx(config.id, config.pattern, config.errorMessage);
        this.regexValidators.push(validator);
        console.log(`${config.id} 있음`);
      }
    });
  }

  handleFormSubmit(event) {
    const allValid = this.regexValidators.every(validator => validator.isValid());
    // 비밀번호 확인 필드가 존재하는 경우 검증 수행

    if (!allValid || (passwordConfirmElement && password !== passwordConfirmElement.value)) {
      event.preventDefault();
      console.error('폼 유효성 검사 실패. 제출이 취소되었습니다.');
    }
  }
}

// const formValidator = new FormValidator("loginForm");

export {RegEx, FormValidator};
