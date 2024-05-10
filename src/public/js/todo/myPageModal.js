document.querySelector(".myPageBtn").addEventListener("click",(e)=>{
  console.log("myPAge")
  e.preventDefault();
  e.stopPropagation();
  document.querySelector(".modal#myPageModal").style.display = "block";
})