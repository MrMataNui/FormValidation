'use strict';
function getName(tag){return document.getElementsByName(tag);}

function validOther (text) {
	// return /^[]/.exec(text).join('');
}
function validNumeric (text) {
	return /^[0-9]{1,}/.exec(text).join('');
}
function validNumSize (text, size) {
	var numSize = new RegExp('^[0-9]{'+size+',}');
	return numSize.exec(text).join('');
}
function validSize (text, size) {
	var size = new RegExp('{'+size+',}');
	return size.exec(text).join('');
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
function submittionCheck() {
	// checks the validity of each input
	function checkValidity(form) {
		var inputs = $('[name="'+form+'"] input');
		var classes = [];
		var validCheck = [];
		$.each(inputs, function(key, val) {
			classes.push( $(val).attr('class') );
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
					validCheck[key] = null;
				}
				// console.log(validCheck);
			} else {
				validCheck[key] = null;
			}
		});
		// console.log(inputs);
		// console.log(classes);
		// console.log(validCheck);
		return [validCheck, inputs];
	}
	// Form-1 submit click
	$('#submit1').click(function() {
		var validation = checkValidity('Form-1');
		var inputs = validation[1];
		validation = validation[0];

		var Checks = [];
		var firstNameCheck	= new getError('firstName',	'first name',	validation[0]);
		var lastNameCheck	= new getError('lastName',	'last name',	validation[1]);
		var zipCodeCheck	= new getError('zip',		'zip code',		validation[2]);
		var empIdCheck		= new getError('ID',		'employee ID',	validation[3]);

		var allError = {
			'firstNameCheck':	firstNameCheck,
			'lastNameCheck':	lastNameCheck,
			'zipCodeCheck':		zipCodeCheck,
			'empIdCheck':		empIdCheck
		};
		$.each(inputs, function(key, val) {
			Checks[key] = {
				id:		$(val).attr('id'),
				name:	$(val).attr('name'), 
				regex:	validation[key]
			};
		});
		console.log(Checks);
		$.each(validation, function(key, val) {
			if (val != '') {
				
			}
		});
		errorCheck(allError, 'Form-1');
		/*// else {deleteError('firstName');}
		// else {deleteError('lastName');}
		// else {deleteError('zip');}
		// else {deleteError('ID');}*/
	});
	// Form-2 submit click
	$('#submit2').click(function() {
		var validation = checkValidity('Form-2');

		var bananaCheck		= new getError('bananas',	'banana count',	validation[0]);
		var weekdayCheck	= new getError('weekday',	'weekday',		validation[1]);
		var phoneCheck		= new getError('phone',		'phone nummer',	validation[2]);
		var alphaIDCheck	= new getError('alphaID',	'alpha ID',		validation[3]);
		var painLevelCheck	= new getError('painLevel',	'pain level',	validation[4]);

		var allError = {
			'bananaCheck':		bananaCheck,
			'weekdayCheck':		weekdayCheck,
			'phoneCheck':		phoneCheck,
			'alphaIDCheck':		alphaIDCheck,
			'painLevelCheck':	painLevelCheck
		};
		errorCheck(allError, 'Form-2');
	});
}
// Checks if any of the inputs produce an error
function errorCheck(allError, form) {
	var errors = 0;
	$.each(allError, function(index, element) {
		if (element.regex == null) {
			displayError(element);
			errors++;
			// break;
		} else {
			deleteError(element.loc);
		}
	});
	if (errors==0) {
		// getName(form).submit();
	}
}
// Displays an error for a row if it exist
function displayError(element) {
	$('#'+element.loc).next().text(' Pease enter a valid '+element.text+'.');
	$('#'+element.loc).focus();
	// var formVal = document.forms['Form-1'][element.loc].val();
	// alert(element.text+' must be filled out');
}
//	Removes the error text from the field
function deleteError(loc) {
	$('#'+loc).next().text(' *');
}
window.onload = init;