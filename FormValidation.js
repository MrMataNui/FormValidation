'use strict';
// Checks if each input is valid
const validity = (text) => (text == null) ? text : text.join('');
const validNumeric = (text) => validity(/^[0-9]+/.exec(text));
const validNumSize = (text, size) => validity(RegExp(`^[0-9]{${size}}`).exec(text));
const validSize = (text, size) => validity(RegExp(`[A-Za-z0-9]{${size}}`).exec(text));
const validName = (text) => validity(/^[A-Za-z]+/.exec(text));
const validDay = (text) => validity(/day$/.exec(text));
const validOther = (text) => validity(/^[A-Za-z0-9]+/.exec(text));

// checks the validity of each input
function checkValidity(inputs) {
  var validCheck = [];
  $.each(inputs, function (key, val) {
    if ($(val).hasClass('required')) {
      if ($(val).attr('class') !== undefined) {
        if ($(val).is('.numeric:not(.required_size)')) {
          validCheck[key] = validNumeric($(val).val());
        }
      } else if ($(val).is('.required_size:not(.numeric)')) {
        validCheck[key] = validSize($(val).val(), $(val).attr('maxlength'));
      } else if ($(val).is('.numeric.required_size')) {
        validCheck[key] = validNumSize($(val).val(), $(val).attr('maxlength'));
      } else {
        validCheck[key] = validOther($(val).val());
      }
    } else if ($(val).is('#firstName, #lastName') >= 0) {
      validCheck[key] = validName($(val).val());
    } else if ($(val).is('#weekday')) {
      validCheck[key] = validDay($(val).val());
    } else {
      validCheck[key] = validOther($(val).val());
    }
  });
  return validCheck;
}
// Initializes the validation variables
function initVar(inputs, validation, checks) {
  $.each(inputs, function (key, val) {
    checks[key] = {
      id: $(val).attr('id'),
      name: $(val).attr('name'),
      regex: validation[key]
    };
  });
  return checks;
}
// Gets the validation variables
function getValidation(form) {
  var inputs = $('[name="' + form + '"] input');
  var validation = checkValidity(inputs);
  var checks = initVar(inputs, validation, []);
  errorCheck(checks);
}
// Checks if any of the inputs produce an error
function errorCheck(checkError) {
  var errors = 0;
  $.each(checkError, function (index, element) {
    if (element.hasClass('required')) {
      if (element.regex == null) {
        displayError(element);
        errors++;
      } else {
        deleteError(element.id);
      }
    }
  });
  // submits the form if there are no errors
  $('form').submit(function (event) {
    return (errors > 0) ? false : '';
  });
}
// Displays an error for a row if it exist
function displayError(element) {
  $('#' + element.id).next().text(' Pease enter a valid ' + element.name + '.');
  // $('#'+element.id).focus();
}
//	Removes the error text from the field
function deleteError(id) {
  $('#' + id).next().text(' *');
}
window.onload = function () {
  for (var i = 0; i < $('st').length; i++) {
    $('st')[i].innerHTML = ' *';
  }
  // Form-1 submit click
  $('#submit1').click(function () {
    getValidation('Form-1');
  });
  // Form-2 submit click
  $('#submit2').click(function () {
    getValidation('Form-2');
  });
};
