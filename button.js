// JavaScript to add animations after form submission
const myForm = document.getElementById('myForm');

myForm.addEventListener('submit', function (event) {
  event.preventDefault(); // Prevent the form from being submitted by default
  const button = event.target.querySelector('button');
  const img = button.querySelector('img');

  // Add the animations when the form is submitted
  button.classList.add('focus-animation');
  img.classList.add('appear-animation');

  // You can optionally add a delay before actually submitting the form
  setTimeout(function () {
    myForm.submit(); // Now submit the form after animations
  }, 5000); // Add a delay of 1 second (adjust as needed)
});
