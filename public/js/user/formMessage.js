class FormMessage {
  constructor(id){
    this.id = id;
    this.formMessage = document.querySelector('.formMessage');
  }
  errMessage(text){
    this.formMessage.textContent = `${text} : ${data.message}`;
  }
}
export default FormMessage;