class FormMessage {
  constructor(id){
    this.id = id;
    this.formMessage = document.querySelector('.formMessage');
  }
  errMessage(text,data){
    this.formMessage.textContent = `${text} : ${data.message}`;
  }
}
// console.log('formdata');
export default FormMessage;