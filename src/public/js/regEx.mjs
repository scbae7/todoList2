class RegEx {
  constructor(id, pattern, errorMessage){
    this.inputId = id;
    this.pattern = pattern;
    this.errorMessage = errorMessage;

    this.input = document.getElementById(id);

    if(!this.input){
      console.error(`${id} 없음`);
      return;
    }

    this.input.addEventListener('input',this.validate.bind(this));
    this.input.form.addEventListener('submit',this.handleSubmit.bind(this));
  }
  validate(){
    const value = this.input.value;
    const regex = new RegExp(this.pattern);

    if(!regex.test(value)){
      this.input.setCustomValidity(this.errorMessage);
    }else{
      this.input.setCustomValidity('');
    }
  }
  handleSubmit(event){
    const value = this.input.value;
    const regex = new RegExp(this.pattern);

    if(!regex.text(value)){
      event.preventDefault();
    }
  }
}

export default RegEx;

