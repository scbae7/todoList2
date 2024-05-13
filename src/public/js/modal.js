class Modal {
  constructor(id){
    this.id = id;
    this.modal = document.querySelector('.modal');
    this.modals = document.querySelectorAll('.modal');
    this.openModalBtn = document.getElementById('openModalBtn');
    this.closeModalBtn = document.getElementById('closeModalBtn');
    this.bindEvents();
  }
  bindEvents(){
    if(this.openModalBtn){
      this.openModalBtn.addEventListener('click',this.openModal.bind(this));
    }
    if(this.closeModalBtn){
      this.closeModalBtn.addEventListener('click',this.closeModal.bind(this));
    }
    if(this.closeModalBtn){
      document.addEventListener('keydown',this.handleKeyDown.bind(this));
    }
  }
  openModal(e){
    e.preventDefault();
    this.modal.style.display = "block";
  }
  closeModal(e){
    e.preventDefault();
    this.modal.style.display = "none";
  }
  handleKeyDown(e){
    e.preventDefault();
    if(e.key === 'Escape'){
      console.log('esc눌림');
      this.modals.forEach(modal=>{
        modal.style.display = 'none';
      });
    }
  }
}

const modal = new Modal('modal');
