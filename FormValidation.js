'use strict';
function getName(tag){return document.getElementsByName(tag);}
// Checks if each input is valid
function validOther (text) {
	var other = /^[A-Za-z0-9]{1,}/.exec(text);
	if (other == null) {return other;}
	else {return other.join('');}
}
function validName (text) {
	var other = /^[A-Za-z]{1,}/.exec(text);
	if (other == null) {return other;}
	else {return other.join('');}
}
function validDay (text) {return /day$/.exec(text).join('');}
function validNumeric (text) {
	var num = /^[0-9]{1,}/.exec(text);
	if (num == null) {return num;}
	else {return num.join('');}
}
function validNumSize (text, size) {
	var numSize = new RegExp('^[0-9]{'+size+'}');
	if (numSize.exec(text) == null) {return numSize.exec(text);}
	else {return numSize.exec(text).join('');}
}
function validSize (text, size) {
	var size = new RegExp('[A-Za-z0-9]{'+size+'}');
	if (size.exec(text) == null) {return size.exec(text);}
	else {return size.exec(text).join('');}
}
function getError (loc, text, regex) {
	this.loc = loc;
	this.text = text;
	this.regex = regex;
}

function init() {
	for (var i=0; i<$('st').length; i++) {
		$('st')[i].innerHTML = ' *';
	}
	submittionCheck();
}
// checks the validity of each input
function checkValidity(form) {
	var inputs = $('[name="'+form+'"] input');
	var classes = [], IDs = [];
	var validCheck = [];
	$.each(inputs, function(key, val) {
		classes.push( $(val).attr('class') );
		IDs.push( $(val).attr('id') );
	});
	$.each(inputs, function(key, val) {
		if (classes[key] !== undefined) {
			if ( classes[key].indexOf('numeric')>=0 && classes[key].indexOf('required_size')<0 ) {
				validCheck[key] = validNumeric( $(val).val() );
			} else if ( classes[key].indexOf('required_size')>=0 && classes[key].indexOf('numeric')<0 ) {
				validCheck[key] = validSize( $(val).val(), $(val).attr('maxlength') );
			} else if ( classes[key].indexOf('required_size')>=0 && classes[key].indexOf('numeric')>=0 ) {
				validCheck[key] = validNumSize( $(val).val(), $(val).attr('maxlength') );
			} else {
				validCheck[key] = validOther( $(val).val() );
			}
		} else if ( IDs[key].indexOf('firstName')>=0 ) {
			validCheck[key] = validName( $(val).val() );
		} else if ( IDs[key].indexOf('lastName')>=0 ) {
			validCheck[key] = validName( $(val).val() );
		} else if ( IDs[key].indexOf('weekday')>=0 ) {
			validCheck[key] = validDay( $(val).val() );
		} else {
			validCheck[key] = validOther( $(val).val() );
		}
	});
	return [validCheck, inputs];
}
// checks the validity of each input
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
	var validation = checkValidity(form);
	var inputs = validation[1];
	validation = validation[0];
	var checks = initVar(inputs, validation, []);
	console.log(checks);
	$.each(validation, function(key, val) {});
	errorCheck(checks, form);
}
function submittionCheck() {
	// Form-1 submit click
	$('#submit1').click(function() {
		getValidation('Form-1');
	});
	// Form-2 submit click
	$('#submit2').click(function() {
		getValidation('Form-2');
	});
}
// Checks if any of the inputs produce an error
function errorCheck(allError, form) {
	var errors = 0;
	$.each(allError, function(index, element) {
		console.log(element);
		if (element.regex == null) {
			displayError(element);
			errors++;
			// break;
		} else {
			deleteError(element.id);
		}
	});
	$( '[name="'+form+'"]' ).submit(function( event ) {
		if (errors==0) {
			// getName(form).submit();
			return;
		} else {
			event.preventDefault();
		}
	});
}
// Displays an error for a row if it exist
function displayError(element) {
	$('#'+element.id).next().text(' Pease enter a valid '+element.name+'.');
	$('#'+element.id).focus();
	// alert(element.text+' must be filled out');
}
//	Removes the error text from the field
function deleteError(id) {$('#'+id).next().text(' *');}
window.onload = init;