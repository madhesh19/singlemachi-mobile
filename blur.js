// JavaScript to add zoom effect on click
const formFields = document.querySelectorAll('input, select');

formFields.forEach(field => {
  field.addEventListener('focus', () => {
    /*// Add the 'zoomed' class to the clicked field and its label
    field.classList.add('zoomed');
    const label = field.previousElementSibling;
    label.classList.add('zoomed');*/

    // Remove the 'blurred' class from all form fields except the clicked one
    formFields.forEach(formField => {
      if (formField !== field) {
        formField.classList.add('blurred');
      }
    });
  });

  field.addEventListener('blur', () => {
    // Remove the 'zoomed' class from the clicked field and its label
    field.classList.remove('zoomed');
    const label = field.previousElementSibling;
    label.classList.remove('zoomed');

    // Remove the 'blurred' class from all form fields
    formFields.forEach(formField => {
      formField.classList.remove('blurred');
    });
  });
});