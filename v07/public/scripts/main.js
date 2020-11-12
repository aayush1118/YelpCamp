const btn = document.querySelector("#themeSwitch");
const body = document.body;

body.classList.add(localStorage.getItem('theme'));

btn.addEventListener("click", ()=> {
  body.classList.toggle('dark-theme');
  if (body.classList.contains('dark-theme')) {
    localStorage.setItem('theme','dark-theme');
  } else {
    localStorage.setItem('theme','light-theme');
  }
  console.log(localStorage.getItem('theme'));
});