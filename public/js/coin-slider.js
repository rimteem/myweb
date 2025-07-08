// Coin Slider JS (infinite loop effect)
document.addEventListener('DOMContentLoaded', function () {
  const slider = document.querySelector('.coin-slider');
  if (!slider) return;
  // Duplicate coins for infinite effect
  slider.innerHTML += slider.innerHTML;
});
