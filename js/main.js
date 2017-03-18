let display = document.querySelector('#display')
let clear = document.querySelector('#clear')
let clearEntry = document.querySelector('#clearEntry')
let backspace = document.querySelector('#backspace')
let negation = document.querySelector('#negation')
let decimal = document.querySelector('#decimal')
let addition = document.querySelector('#addition')
let subtraction = document.querySelector('#subtraction')
let multiplication = document.querySelector('#multiplication')
let division = document.querySelector('#division')
let equals = document.querySelector('#equals')

let sum = []
let entry = []
const operators = {
	addition: '+',
	subtraction: '-',
	multiplication: '*',
	division: '/'
}
const operatorKeys = Object.keys(operators)

const operation = (operator) => {
	if (entry.length > 0) {
		sum.push(entry.join(''))
		sum.push(operator)
		display.textContent = entry.join('')
		entry = []
	}
}

// Add event listeners to operators (+, -, *, /)
for (let i = 0; i < operatorKeys.length; i++) {
	let id = '#'+operatorKeys[i]
	document.querySelector(id).addEventListener('click', function () {
		operation(operators[operatorKeys[i]])
	})
}

// Add event listeners to digits (0..9)
for (let i = 0; i < 10; i++) {
	let key = document.querySelector('#numpad'+i)
	key.addEventListener('click', function () {
		if (!(i === 0 && entry.length === 0)) {
			entry.push(this.textContent)
			display.textContent = entry.join('')
		}
	})
}

clear.addEventListener('click', function () {
	entry = []
	sum = []
	display.textContent = 0
})

clearEntry.addEventListener('click', function () {
	entry = []
	display.textContent = 0
})

backspace.addEventListener('click', function () {
	entry.pop()
	if (entry.length > 0) display.textContent = entry.join('')
	else display.textContent = 0
})

negation.addEventListener('click', function () {
	if (entry.length != 0) {
		if (entry.indexOf('-') === -1) {
			entry.unshift('-')
		} else {
			let index = entry.indexOf('-')
			entry.splice(index, 1)
		}
		display.textContent = entry.join('')
	}
})

decimal.addEventListener('click', function () {
	if (entry.indexOf('.') === -1) {
		entry.push('.')
		display.textContent = entry.join('')
	}
})

equals.addEventListener('click', function () {
	if (entry.length > 0) {
		sum.push(entry.join(''))
		var total = eval(sum.join(''))
		display.textContent = total
		sum = []
		entry = String(total).split('')
	}
})
