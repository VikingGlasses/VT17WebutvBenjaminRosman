"use strict";

var idNumberElement = document.getElementById("idNumber");
var leapYearElement = document.getElementById("leapYear");
var numberSumElement = document.getElementById("numberSum");

/**
 * Returns true if value only contains numbers otherwhise false.
 * @param value
 * @returns {boolean}
 */
function isNumber(value) {
	var char;

	if (value.length === 0) {
		return false;
	}

	for (var i = 0; i < value.length; i++) {
		char = value.charAt(i);
		if (char < '0' || char > '9') {
			return false;
		}
	}
	return true;
}

/**
 * Sets the inner HTML of id to result.
 * @param id The elements id.
 * @param result
 */
function setResult(id, result) {
	var element = document.getElementById(id);
	element.innerHTML = result;
}

/**
 * Returns the sum each number in number
 * @param number
 * @returns {number}
 */
function numberSum(number) {
	var rest;
	if (number < 10) {
		return number;
	}
	rest = number % 10;
	return rest + numberSum((number - rest)/10);
}

/**
 * Returns the luhn sum
 * @param value
 * @returns {number}
 */
function luhnCheckSum(value) {
	var sum = 0;
	var number;
	for (var i = 0; i < value.length; i++) {
		number = parseInt(value.charAt(i), 10);
		if (i % 2 === 0) {
			sum += numberSum(number*2);
		} else {
			sum += number;
		}
	}
	return sum % 10;
}

/**
 * Returns true if given year is a leap year.
 * @param year
 * @returns {boolean}
 */
function isLeapYear(year) {
	return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}


idNumberElement.onchange = function() {
	var value = idNumberElement.value;
	setResult("idNumberResult", "");

	// ta bort bindestreck om det finns
	value = value.replace("-", "");

	// kontrollerar längden
	if (value.length !== 10 && value.length !== 12) {
		setResult("idNumberResult", "bad length");
		return;
	}

	// titta så att det bara är siffror
	if (!isNumber(value)) {
		setResult("idNumberResult", "Illegal character");
		return;
	}

	// ta bort år hundrade
	if (value.length == 12) {
		value = value.substring(2);
	}

	// verifiera kontroll siffra
	if (!(luhnCheckSum(value) === 0)) {
		setResult("idNumberResult", "not valid");
		return;
	}

	setResult("idNumberResult", "valid");
};

leapYearElement.onchange = function() {
	var value = leapYearElement.value;
	var intValue;
	if (!isNumber(value)) {
		setResult("leapYearResult", "Illegal character");
		return;
	}

	intValue = parseInt(value, 10);
	if (isLeapYear(intValue)) {
		setResult("leapYearResult", "Is a leap year");
	} else {
		setResult("leapYearResult", "Not a leap year");
	}
};

numberSumElement.onchange = function() {
	var value = numberSumElement.value;
	var intValue;

	setResult("numberSumResult", "");

	if (!isNumber(value)) {
		setResult("numberSumResult", "Illegal character");
		return;
	}

	intValue = parseInt(value, 10);
	setResult("numberSumResult", numberSum(intValue));
};

