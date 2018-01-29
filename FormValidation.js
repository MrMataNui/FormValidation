'use strict';
// Checks if each input is valid
function validity (text) { return (text == null) ? text : text.join(''); }
function validNumeric (text) { return validity( /^[0-9]{1,}/.exec(text) ); }
function validNumSize (text, size) { return validity( RegExp('^[0-9]{'+size+'}').exec(text) ); }
function validSize (text, size) { return validity( RegExp('[A-Za-z0-9]{'+size+'}').exec(text) ); }
function validName (text) { return validity( /^[A-Za-z]{1,}/.exec(text) ); }
function validDay (text) { return validity( /day$/.exec(text) ); }
function validOther (text) { return validity( /^[A-Za-z0-9]{1,}/.exec(text) ); }

// checks the validity of each input
function checkValidity(form) {
	var inputs = $('[name="'+form+'"] input');
	var validCheck = [];
	$.each(inputs, function(key, val) {
		if ($(val).attr('class') !== undefined)
			if ( $(val).is('.numeric:not(.required_size)') )
				validCheck[key] = validNumeric( $(val).val() );
			else if ( $(val).is('.required_size:not(.numeric)') )
				validCheck[key] = validSize( $(val).val(), $(val).attr('maxlength') );
			else if ( $(val).is('.numeric.required_size') )
				validCheck[key] = validNumSize( $(val).val(), $(val).attr('maxlength') );
			else
				validCheck[key] = validOther( $(val).val() );
		else if ( $(val).is('#firstName, #lastName')>=0 )
			validCheck[key] = validName( $(val).val() );
		else if ( $(val).is('#weekday') )
			validCheck[key] = validDay( $(val).val() );
		else
			validCheck[key] = validOther( $(val).val() );
	});
	return {validCheck: validCheck, inputs: inputs};
}
// Initializes the validation variables
function initVar(inputs, validation, checks) {
	$.each(inputs, function(key, val) {
		checks[key] = {
			id:		$(val).attr('id'),
			name:	$(val).attr('name'), 
			regex:	validation[key]
		};
	});
	return checks;
}
// Gets the validation variables
function getValidation(form) {
	var validation = checkValidity(form).validCheck;
	var inputs = checkValidity(form).inputs;
	var checks = initVar(inputs, validation, []);
	errorCheck(checks);
}
// Checks if any of the inputs produce an error
function errorCheck(checkError) {
	var errors = 0;
	$.each(checkError, function(index, element) {
		if (element.regex == null) {
			displayError(element);
			errors++;
		} else {deleteError(element.id);}
	});
	// submits the form if there are no errors
	$('form').submit(function( event ) {
		return (errors>0) ? false : '';
	});
}
// Displays an error for a row if it exist
function displayError(element) {
	$('#'+element.id).next().text(' Pease enter a valid '+element.name+'.');
	// $('#'+element.id).focus();
}
//	Removes the error text from the field
function deleteError(id) {$('#'+id).next().text(' *');}
window.onload = function() {
	for (var i=0; i<$('st').length; i++) {$('st')[i].innerHTML = ' *';}
	// Form-1 submit click
	$('#submit1').click(function() { getValidation('Form-1'); });
	// Form-2 submit click
	$('#submit2').click(function() { getValidation('Form-2'); });
};