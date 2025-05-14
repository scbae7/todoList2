class ConfirmModal {
  constructor(id){
    this.id = id;
    this.confirmModal = document.getElementById(id); // id를 활용해 modal을 참조하도록 변경
    this.modalContent = this.confirmModal.querySelector("#modalContent");
    this.closeBtn = this.confirmModal.querySelector("#modalCloseBtn");
    this.loginLink = this.confirmModal.querySelector("#modalLoginLink");

    // 확인 버튼 클릭 시 모달 닫기
    if(this.closeBtn){
      this.closeBtn.addEventListener('click', () => {
        this.hideModal();
      });
    }
  }
  
  showModal(message){
    if (message) {
      this.modalContent.textContent = message;
    }
    this.confirmModal.style.display = "block";
    console.log(message);
  }

  showModalLink(message, showLoginLink = false){
    if (message) {
      this.modalContent.textContent = message;
    }
    
    if (showLoginLink) {
      if (this.closeBtn) {
        this.closeBtn.style.display = 'none';
      }
      if (this.loginLink) {
        this.loginLink.style.display = 'block';
      }
    } else {
      if (this.closeBtn) {
        this.closeBtn.style.display = 'inline';
      }
      if (this.loginLink) {
        this.loginLink.style.display = 'none';
      }
    }
    
    this.confirmModal.style.display = "block";
    console.log(message);
  }
  
  hideModal(){
    this.confirmModal.style.display = "none";
  }
}

export { ConfirmModal };
