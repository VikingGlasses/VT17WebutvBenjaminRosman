"use strict";

var calc = new Calculator(document.getElementById("result"), document.getElementById("results"));


window.onload = function() {
	var numbers = document.getElementsByClassName("calc__number");
	var signs = document.getElementsByClassName("calc__sign");
	var i;
	var element;
	var tmpButton;

	for (i = 0; i < numbers.length; i++) {
		element = numbers[i];
		tmpButton = new NumpadButton(element.innerHTML, calc);
		element.addEventListener('click', tmpButton.pressed, false);
	}

	for (i = 0; i < signs.length; i++) {
		element = signs[i];
		tmpButton = new SignButton(element.innerHTML, calc);
		element.addEventListener('click', tmpButton.pressed, false);
	}
};

function Calculator(_display, _history) {
	this.calcDisplay = new String("0");
	this.overWrite = true;
	this.displayElement = _display;
	this.historyElement = _history;

	this.opperation = function() {
		var expression = this.calcDisplay;
		var result = eval(expression);
		this.calcDisplay = new String(result);
		this.addToHistory(expression + " = " + result);
		this.overWrite = true;
	};

	this.pressedNumpad = function(value) {
		if (this.overWrite || this.calcDisplay === "0") {
			this.calcDisplay = value;
			this.overWrite = false;
		} else {
			this.addToDisplay(value);
		}
		this.update();
	};

	this.pressedSign = function(sign) {
		var lastIssign = this.lastIsSign();
		var isEqualSign = sign === "=";

		if (lastIssign && isEqualSign) {
			return;
		}

		if (lastIssign) {
			this.changeSignTo(sign);
		} else if (isEqualSign) {
			this.opperation();
		} else {
			this.addToDisplay(sign);
			this.overWrite = false;
		}
		this.update();
	};

	this.lastIsSign = function() {
		var lastChar = this.calcDisplay.charAt(this.calcDisplay.length - 1);
		switch (lastChar) {
			case '+':
			case '-':
				return true;
			default:
				return false;
		}
	};

	this.changeSignTo = function(sign) {
		var tmp = this.calcDisplay;
		tmp = tmp.substring(0, tmp.length - 1) + sign;
		this.calcDisplay = tmp;
	};

	this.addToDisplay = function(value) {
		this.calcDisplay += value;
	};

	this.update = function() {
		this.displayElement.innerHTML = this.calcDisplay;
	};

	this.addToHistory = function(expression) {
		var item = document.createElement("li");
		item.innerHTML = expression;
		this.historyElement.appendChild(item);
	}
}

function NumpadButton(value, calc) {
	this.pressed = function() {
		calc.pressedNumpad(value);
	};
}

function SignButton(sign, calc) {
	this.pressed = function() {
		calc.pressedSign(sign);
	};
}
