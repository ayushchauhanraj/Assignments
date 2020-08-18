/*
window.addEventListener("load", init);

const toggleClass = (id) => {
	document.getElementById(id).classList.toggle("hide");
};

function init() {
	registerEvent();
	toggleClass("feedback-form");
	toggleClass("vechicle-form");
	handleChoosePrice();
	toggleClass("language");
	toggleClass("price-plan");
	toggleClass("pass");
}

//purhase button handle & show plan
function handlePurchaseButton() {
	showMessage("pass-heading", "Pass");
	showMessage("employee-id", "Employee id : " + employeeData.employeeId);
	showMessage(
		"employee-vechicle",
		"Employee vechicle : " + employeeData.vechicleModel
	);
	showMessage(
		"employee-number",
		"Veichicle Number : " + employeeData.vechicleNumber
	);
	let price = document.getElementById("choose-price").innerHTML;
	if (!employeeData.purchagePlan) {
		employeeData.purchagePlan = price + " Monthly";
	}
	showMessage("employee-plan", "Employee plan : " + employeeData.purchagePlan);
	toggleClass("pass");
	toggleClass("language");
	toggleClass("price-plan");
}
//price click handle
function handleChoosePrice() {
	let priceElement = document.getElementsByClassName("price-choose");
	for (let i = 0; i < priceElement.length; i++) {
		priceElement[i].addEventListener("click", () => {
			let price = priceElement[i].innerText.split(" ");
			let circlePrice =
				priceElement[i].parentElement.parentElement.childNodes[3].childNodes[1]
					.childNodes[0];
			let circlePlan =
				priceElement[i].parentElement.parentElement.childNodes[3].childNodes[3];
			console.log(circlePlan);
			circlePrice.innerHTML = price[0];
			circlePlan.innerHTML = price[1];
		});
	}
}
function handleEmployeeSubmit() {
	let element = document.getElementById("employee-field5");
	let mobileFiled = element.childNodes[3].value;
	let messageId = "employee-message";
	let errorId = "employee-error";
	if (mobileFiled.length > 8 && !isNaN(mobileFiled)) {
		employeeData.mobileNo = mobileFiled;
		toggleClass("employee-field5");
		toggleClass("employee-form");
		toggleClass("vechicle-form");
		let employee_id = parseInt(Math.random() * 10000000);
		employeeData.employeeId = employee_id;
		showMessage(
			messageId,
			"Welcome " +
				employeeData.employeeName +
				"  Your Employee Id  " +
				employeeData.employeeId
		);
	} else {
		if (element.childElementCount == 3) {
			showMessage(
				errorId,
				"Mobile number length Must be greater than 8 and all must be Number!"
			);
		}
	}
}
let plans = {
	cycle: {
		heading: "cycle",
		dailyPlan: 5,
		monthlyPlan: 100,
		yearlyPlan: 500,
	},
	motorCycle: {
		heading: "motorCycle",
		dailyPlan: 10,
		monthlyPlan: 200,
		yearlyPlan: 1000,
	},
	fourWheeler: {
		heading: "fourWheeler",
		dailyPlan: 20,
		monthlyPlan: 500,
		yearlyPlan: 3500,
	},
};
function showPlan(planObject, type = "$", multiplyValue = 1) {
	showMessage("plan-heading", planObject.heading);
	showMessage("choose-price", type + planObject.monthlyPlan * multiplyValue);
	showMessage("choose-plan", "/monthy");
	showMessage(
		"dailyPlan",
		type + planObject.dailyPlan * multiplyValue + " daily"
	);
	showMessage(
		"monthlyPlan",
		type + planObject.monthlyPlan * multiplyValue + " monthly"
	);
	showMessage(
		"yearlyPlan",
		type + planObject.yearlyPlan * multiplyValue + " yearly"
	);
}
function handleVechicleSubmit() {
	var div_element = document.getElementById("vechicle-field6");
	let inputFiled = div_element.childNodes[3].value;
	if (inputFiled.length > 2 && inputFiled.length < 40) {
		employeeData.identification = inputFiled;
		toggleClass("vechicle-field6");
		showPlan(plans[employeeData.vechicleType]);
		toggleClass("price-plan");
		toggleClass("language");
		showMessage(
			"vechicle-message",
			" You vechicle Number - " +
				employeeData.vechicleNumber +
				" - is Successfully registered Now Choose your Plan !"
		);
	} else {
		showMessage(
			"vechicle-error",
			"Please Enter your Vechicle Identification !"
		);
	}
}
function handlePasswordKeyUp() {
	let employee_password = document.getElementById("password");
	var mediumRegex = new RegExp(
		"^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
	);
	var strongRegex = new RegExp(
		"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
	);
	if (employee_password.value.length >= 1) {
		employee_password.style =
			"border:0.1rem solid red;box-shadow: 0 0 0.5rem red";
	}
	if (employee_password.value.match(mediumRegex)) {
		employee_password.style =
			"border:0.1rem solid orange;box-shadow: 0 0 0.5rem orange";
	}
	if (employee_password.value.match(strongRegex)) {
		employee_password.style =
			"border:0.1rem solid green;box-shadow: 0 0 0.5rem green";
	}
}
//Event Listener binding or register
let registerEvent = () => {
	document.getElementById("employee-heading").addEventListener("click", () => {
		toggleClass("employee-form");
	});
	document.getElementById("vechicle-heading").addEventListener("click", () => {
		toggleClass("vechicle-form");
	});

	document.getElementById("feedback-heading").addEventListener("click", () => {
		toggleClass("feedback-form");
	});

	//purchase plan register
	document.getElementById("dailyPlan").addEventListener("click", () => {
		let value = document.getElementById("plan-heading").innerHTML;
		let plan = document.getElementById("choose-plan").innerHTML;
		employeeData.purchagePlan = "$" + plans[value].dailyPlan + " Daily";
	});
	document.getElementById("monthlyPlan").addEventListener("click", () => {
		let value = document.getElementById("plan-heading").innerHTML;
		let plan = document.getElementById("choose-plan").innerHTML;
		employeeData.purchagePlan = "$" + plans[value].monthlyPlan + " Monthly";
	});
	document.getElementById("yearlyPlan").addEventListener("click", () => {
		let value = document.getElementById("plan-heading").innerHTML;
		let plan = document.getElementById("choose-plan").innerHTML;
		employeeData.purchagePlan = "$" + plans[value].yearlyPlan + " yearly";
	});
	//currency Change bind
	let priceIn = document.getElementById("currency");
	priceIn.addEventListener("change", () => {
		let value = document.getElementById("plan-heading").innerHTML;
		let circleContainer = document.getElementsByClassName(
			"monthly-circle-container"
		);
		if (priceIn.value == "yen") {
			showPlan(plans[value], "¥", 106.59);
			circleContainer[0].style = "width:6rem;height:5.4rem;padding-top:0.3rem";
		} else if (priceIn.value == "dollar") {
			showPlan(plans[value]);
			circleContainer[0].style = "width:5rem;height:5rem";
		} else if (priceIn.value == "rupees") {
			showPlan(plans[value], "₹", 75);
			circleContainer[0].style = "width:6rem;height:5.4rem;padding-top:0.3rem";
		}
	});

	let purchaseButton = document.getElementsByClassName("purchageBtn");
	for (let i = 0; i < purchaseButton.length; i++) {
		purchaseButton[i].addEventListener("click", handlePurchaseButton);
	}
	document
		.getElementById("vechicle-submit")
		.addEventListener("click", handleVechicleSubmit);

	document
		.getElementById("employee-submit")
		.addEventListener("click", handleEmployeeSubmit);

	let employeeFormElements = document.getElementsByClassName("employee-field");
	handleFormDisplay(employeeFormElements);

	let vechicleFormElements = document.getElementsByClassName("vechile-field");
	handleFormDisplay(vechicleFormElements);

	//employee display bind function
	for (let i = 0; i < employeeFormElements.length - 1; i++) {
		if (i == 3) {
			continue;
		}
		document
			.getElementById("employee-field" + (i + 1))
			.addEventListener("focusout", () => {
				onClickNextEmployee("employee-field" + (i + 1));
			});
	}

	// vechicle form bind function

	for (let i = 0; i < vechicleFormElements.length - 1; i++) {
		document
			.getElementById("vechicle-field" + (i + 1))
			.addEventListener("focusout", () => {
				onClickNextVechile("vechicle-field" + (i + 1));
			});
	}

	let employee_password = document.getElementById("password");
	employee_password.addEventListener("keyup", handlePasswordKeyUp);

	document
		.getElementById("confirmPassword")
		.addEventListener("focusout", () => {
			onClickNextEmployee("employee-field4");
		});
};

const handleFormDisplay = (input, displayTag = 0) => {
	for (let i = 0; i < input.length; i++) {
		input[i].classList.toggle("hide");
		if (displayTag == i) {
			input[i].classList.toggle("hide");
		}
	}
};
let employeeData = {};
const onClickNextEmployee = (id) => {
	var div_element = document.getElementById(id);
	let inputFiled = div_element.childNodes[3].value;
	var elementChild = div_element.childElementCount;
	let messageId = "employee-message";
	let errorId = "employee-error";
	showMessage(errorId, "");

	switch (id) {
		case "employee-field1":
			if (inputFiled.length > 3 && inputFiled.length < 40) {
				employeeData.employeeName = inputFiled;
				toggleClass(document.getElementById(id).nextElementSibling.id);
				toggleClass(id);
				showMessage(
					messageId,
					"Hi ," + employeeData.employeeName + " Can i know your Gender ?"
				);
			} else {
				showMessage(errorId, "Name must be atleast 3 character long !");
			}

			break;
		case "employee-field2":
			let employee_gender = document.querySelector(
				'input[name="gender"]:checked'
			).value;
			if (employee_gender.length) {
				employeeData.gender = employee_gender;
				toggleClass(id);
				toggleClass(document.getElementById(id).nextElementSibling.id);
				showMessage(
					messageId,
					employeeData.employeeName + "  Please ! Enter your Email address"
				);
			}
			break;
		case "employee-field3":
			if (inputFiled.length > 11 && inputFiled.includes("@metacube.com")) {
				employeeData.employeeMail = inputFiled;
				toggleClass(id);
				toggleClass(document.getElementById(id).nextElementSibling.id);
				showMessage(
					messageId,
					employeeData.employeeName + "  ,Please ! Enter a unique Password "
				);
			} else {
				showMessage(
					errorId,
					"Please Enter a valid Email containing @metacube.com"
				);
			}
			break;
		case "employee-field4":
			let password = document.getElementById("password").value;
			let confirmpassword = document.getElementById("confirmPassword").value;
			var strongRegex = new RegExp(
				"^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
			);
			if (
				password.length > 7 &&
				confirmpassword == password &&
				password.match(strongRegex)
			) {
				toggleClass(id);
				employeeData.password = inputFiled;
				toggleClass(document.getElementById(id).nextElementSibling.id);
				showMessage(
					messageId,
					employeeData.employeeName + "  Please ! Enter your mobile Number "
				);
			} else {
				showMessage(
					errorId,
					"password Does not match OR Contain Uppercase, Lowercase, Numeric, Alphanumeric, and length minimum 8"
				);
			}

			break;
		default:
			break;
	}
};

// Veichle form handle

const onClickNextVechile = (id) => {
	var div_element = document.getElementById(id);
	let inputFiled = div_element.childNodes[3].value;
	var elementChild = div_element.childElementCount;
	let messageId = "vechicle-message";
	let user = employeeData.employeeName || "Sir";
	let errorId = "vechicle-error";
	showMessage(errorId, "");
	switch (id) {
		case "vechicle-field1":
			if (inputFiled.length > 2 && inputFiled.length < 40) {
				employeeData.carCompany = inputFiled;
				toggleClass(document.getElementById(id).nextElementSibling.id);
				toggleClass(id);
				showMessage(messageId, user + " ! Can i know your  Vechicle Model ?");
			} else {
				showMessage(
					errorId,
					"VEHICLE Name must be at-least 3 character long !"
				);
			}
			break;
		case "vechicle-field2":
			if (inputFiled.length > 2 && inputFiled.length < 40) {
				employeeData.vechicleModel = inputFiled;
				toggleClass(document.getElementById(id).nextElementSibling.id);
				toggleClass(id);
				showMessage(messageId, user + " ! Can i know your Vechicle Type ?");
			} else {
				showMessage(errorId, "Please Enter your Vechicle Model !");
			}
			break;
		case "vechicle-field3":
			if (inputFiled.length > 3 && inputFiled.length < 40) {
				employeeData.vechicleType = inputFiled;
				toggleClass(document.getElementById(id).nextElementSibling.id);
				toggleClass(id);
				showMessage(messageId, user + " ! Can i know your Vechicle Number ?");
			} else {
				showMessage(errorId, "Please Enter your Vechicle Type !");
			}
			break;
		case "vechicle-field4":
			if (inputFiled.length > 2 && inputFiled.length < 40) {
				employeeData.vechicleNumber = inputFiled;
				toggleClass(document.getElementById(id).nextElementSibling.id);
				toggleClass(id);
				showMessage(messageId, user + " ! Can i know your Empoyee Id ?");
			} else {
				showMessage(errorId, "Please Enter your Vechicle Number !");
			}
			break;
		case "vechicle-field5":
			if (inputFiled.length > 2 && inputFiled.length < 40) {
				employeeData.employeeId = inputFiled;
				toggleClass(document.getElementById(id).nextElementSibling.id);
				toggleClass(id);
				showMessage(
					messageId,
					user + " ! Can i know your Vechicle Identification ?"
				);
			} else {
				showMessage(errorId, "Please Enter your Employee Id !");
			}
			break;

		default:
			break;
	}
};

const showMessage = (id, message) => {
	document.getElementById(id).innerHTML = message;
};

*/
