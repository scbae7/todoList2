class ConfirmModal {
  constructor(id){
    this.id = id;
    this.confirmModal = document.getElementById("confirmModal");
    this.modalContent = document.getElementById("modalContent");
  }
  showModal(message){
    if(message){
      this.modalContent.textContent = message;
      this.confirmModal.style.display = "block";
    }else{
      this.confirmModal.style.display = "block";
    }
    
  }
}