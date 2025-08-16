const slides = document.querySelectorAll('.slide');
const next = document.querySelector('#next');
const prev = document.querySelector('#prev');
const auto = false;
const intervalTime = 5000;
let slideInterval; 

const nextSlide = () => {
  // We take the current slide...
  const current = document.querySelector('.current')
  // We move the current class "status" it has and give it to the next slide. Then, we add it to the start again when we run out of slides. This creates a loop!
  current.classList.remove('current');
  if(current.nextElementSibling) {
    current.nextElementSibling.classList.add('current');
  } else {
    slides[0].classList.add('current');
  }
  setTimeout(() => current.classList.remove('current'));
}

const prevSlide = () => {
  // We take the current slide...
  const current = document.querySelector('.current')
  // We move the current class "status" it has and give it to the previous slide. Then, we add it to the start again when we run out of slides. This creates a loop, now in reverse!
  current.classList.remove('current');
  if(current.previousElementSibling) {
    current.previousElementSibling.classList.add('current');
  } else {
    slides[slides.length -1].classList.add('current');
  }
  setTimeout(() => current.classList.remove('current'));
}

// Let's actually make those buttons use our rules.

next.addEventListener('click', e => {
  nextSlide();
  });

prev.addEventListener('click', e => {
  prevSlide();
  });

// If you want the slides to automatically move... use this code and put const auto into true!

if(auto) {
  slideInterval = setInterval(nextSlide, intervalTime);
}
