import JustValidate from 'just-validate';

// Function to handle form submission
function handleFormSubmit(form) {
  // Create FormData object from the form
  const formData = new FormData(form);
  
  // Convert FormData to plain object for easier handling
  const formValues = Object.fromEntries(formData.entries());
  
  // Log form data to console (for testing)
  console.log('Form submitted with values:', formValues);
  
  // Here you can add your fetch/AJAX call to submit the form
  // Example:
  /*
  fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formValues)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    form.reset();
  })
  .catch((error) => {
    console.error('Error:', error);
  });
  */
  
  // Reset the form after submission
  form.reset();
}

export function initValidation() {
  const form = document.querySelector('.contact-box form');
  if (!form) return;

  const validator = new JustValidate(form, {
    errorFieldCssClass: 'error',
    successFieldCssClass: 'success',
    errorLabelCssClass: 'form-error-message',
    focusInvalidField: true,
    lockForm: true,
  });

  validator
    .addField('[name="name"]', [
      { rule: 'required', errorMessage: 'Name is required' },
      { rule: 'minLength', value: 2, errorMessage: 'Name is too short' },
      { rule: 'maxLength', value: 30, errorMessage: 'Name is too long' },
    ])
    .addField('[name="email"]', [
      { rule: 'required', errorMessage: 'Email is required' },
      { rule: 'email', errorMessage: 'Invalid email format' },
    ])
    .addField('[name="message"]', [
      { rule: 'required', errorMessage: 'Message is required' },
      { rule: 'minLength', value: 10, errorMessage: 'Message is too short' },
    ])
    .onSuccess((event) => {
      event.preventDefault();
      handleFormSubmit(form);
    });
}
