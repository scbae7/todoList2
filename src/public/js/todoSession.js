console.log("ss")
document.addEventListener('DOMContentLoaded', () => {
  if (!sessionStorage.getItem('sessionActive')) {
    window.location.href = '/user/login';
  }
});

window.addEventListener('beforeunload', () => {
  sessionStorage.setItem('sessionActive', 'true');
});