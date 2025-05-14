class ControlModal {
  constructor(modalId) {
    this.modal = document.getElementById(modalId);
    this.openModalBtns = document.querySelectorAll(`[data-open-modal="${modalId}"]`);
    this.closeModalBtns = document.querySelectorAll('.closeModalBtn');
    this.bindEvents();
  }

  bindEvents() {
    this.openModalBtns.forEach(btn => {
      btn.addEventListener('click', this.openModal.bind(this));
    });

    this.closeModalBtns.forEach(btn => {
      btn.addEventListener('click', this.closeModal.bind(this));
    });

    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  openModal(e) {
    e.preventDefault();
    this.modal.style.display = "block";
  }

  closeModal(e) {
    e.preventDefault();
    if (this.modal) {
      this.modal.style.display = "none";
    }
  }
  

  handleKeyDown(e) {
    if (e.key === 'Escape') {
      console.log('esc눌림');
      this.modal.style.display = 'none';
    }
  }
}
document.querySelectorAll('.modal').forEach(modal => {
  const modalId = modal.id;
  new ControlModal(modalId);
});
