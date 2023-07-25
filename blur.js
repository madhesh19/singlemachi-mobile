// JavaScript to add blur effect on focus and remove blur on blur (when focus is lost)
const formFields = document.querySelectorAll('input, select, h2');
    
formFields.forEach(field => {
  field.addEventListener('focus', () => {
    // Add the 'blurred' class to all form fields except the focused one
    formFields.forEach(formField => {
      if (formField !== field) {
        formField.classList.add('blurred');
      }
    });
  });

  field.addEventListener('blur', () => {
    // Remove the 'blurred' class from all form fields
    formFields.forEach(formField => {
      formField.classList.remove('blurred');
    });
  });
});