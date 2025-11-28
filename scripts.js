// TOGGE MENU ON LINK CLICK
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.checked = false;
  });
});


// ANIMATION FOR FAVICON
let frames = [
  "frame1.png",
  "frame2.png",
  "frame3.png",
  "frame4.png"
];
let index = 0;

setInterval(() => {
  document.getElementById("favicon").href = frames[index];
  index = (index + 1) % frames.length;
}, 200); // cada 200ms