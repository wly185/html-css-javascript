const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// show error
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  //query selector scope
  const small = formControl.querySelector('small');
  small.innerText = message;
}

function showSuccess(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

//valid email
function checkEmail(input) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //test is a native js
  if (re.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, `${getFieldName(input)} is not a valid email`);
  }
}
//check required
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    // console.log(input.value);

    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}

//to uppercase
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//check length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be shorter than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

//check passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, `passwords do not match`);
  }
}

// event listeners
form.addEventListener('submit', function (e) {
  e.preventDefault();
  // console.log(username.value);
  if (username.value === '') {
    showError(username, 'username is required');
  } else {
    showSuccess(username);
  }

  // if (email.value === '') {
  //   showError(email, 'email is required');
  // } else if (!checkEmail(email.value)) {
  //   showError(email, 'email is not valid');
  // } else {
  //   showSuccess(email);
  // }

  // if (password.value === '') {
  //   showError(password, 'password is required');
  // } else {
  //   showSuccess(password);
  // }

  // if (password2.value === '') {
  //   showError(password2, 'password 2 is required');
  // } else {
  //   showSuccess(password2);
  // }

  //use arrays and call functions here
  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
});
