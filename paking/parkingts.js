"use strict";
window.addEventListener("load", init);
function init() {
    registerEvent();
    toggleClass("feedback-form");
    toggleClass("vechicle-form");
    toggleClass("language");
    toggleClass("price-plan");
    toggleClass("pass");
}
//Event Listener binding or register
var registerEvent = function () {
    document.getElementById("employee-heading").addEventListener("click", function () {
        toggleClass("employee-form");
    });
    document.getElementById("vechicle-heading").addEventListener("click", function () {
        toggleClass("vechicle-form");
    });
    document.getElementById("feedback-heading").addEventListener("click", function () {
        toggleClass("feedback-form");
    });
    //Class object creation
    var employeeObj = new Employee();
    var vechicleObj = new Vechicle();
    var PurchasePlanObj = new PurchasePlan();
    //purchase plan register
    document.getElementById("dailyPlan").addEventListener("click", function () {
        var value = document.getElementById("plan-heading").innerHTML;
        document.getElementById("choose-plan").innerHTML = "/ Daily";
        document.getElementById("choose-price").innerHTML = document
            .getElementById("dailyPlan")
            .innerText.split(" ")[0];
        vechicleObj.vechicleData.purchasePlan =
            "$" + PurchasePlanObj.plans[value].dailyPlan + " Daily";
    });
    document.getElementById("monthlyPlan").addEventListener("click", function () {
        var value = document.getElementById("plan-heading").innerHTML;
        document.getElementById("choose-plan").innerHTML = "/Monthly";
        document.getElementById("choose-price").innerHTML = document
            .getElementById("monthlyPlan")
            .innerText.split(" ")[0];
        vechicleObj.vechicleData.purchasePlan =
            "$" + PurchasePlanObj.plans[value].monthlyPlan + " Monthly";
    });
    document.getElementById("yearlyPlan").addEventListener("click", function () {
        var value = document.getElementById("plan-heading").innerHTML;
        document.getElementById("choose-plan").innerHTML = "/Yearly";
        document.getElementById("choose-price").innerHTML = document
            .getElementById("yearlyPlan")
            .innerText.split(" ")[0];
        vechicleObj.vechicleData.purchasePlan =
            "$" + PurchasePlanObj.plans[value].yearlyPlan + " yearly";
    });
    //currency Change bind
    var priceIn = document.getElementById("currency");
    priceIn.addEventListener("change", function () {
        var value = document.getElementById("plan-heading").innerHTML;
        var circleContainer = document.getElementsByClassName("monthly-circle-container");
        if (priceIn.value == "yen") {
            PurchasePlanObj.showPlan(PurchasePlanObj.plans[value], "¥", 106.59);
            circleContainer[0].style.width = "6rem";
            circleContainer[0].style.height = "5.4rem";
            circleContainer[0].style.paddingTop = "0.3rem";
        }
        else if (priceIn.value == "dollar") {
            PurchasePlanObj.showPlan(PurchasePlanObj.plans[value]);
            circleContainer[0].style.width = "5rem";
            circleContainer[0].style.height = "5rem";
        }
        else if (priceIn.value == "rupees") {
            PurchasePlanObj.showPlan(PurchasePlanObj.plans[value], "₹", 75);
            circleContainer[0].style.width = "6rem";
            circleContainer[0].style.height = "5.4rem";
            circleContainer[0].style.paddingTop = "0.3rem";
        }
    });
    var purchaseButton = document.getElementsByClassName("purchageBtn");
    for (var i = 0; i < purchaseButton.length; i++) {
        purchaseButton[i].addEventListener("click", function () {
            PurchasePlanObj.handlePurchaseButton(employeeObj, vechicleObj);
        });
    }
    document.getElementById("vechicle-submit").addEventListener("click", function () {
        vechicleObj.handleVechicleSubmit(PurchasePlanObj);
    });
    document.getElementById("employee-submit").addEventListener("click", function () {
        employeeObj.handleEmployeeSubmit();
    });
    var employeeFormElements = document.getElementsByClassName("employee-field");
    handleFormDisplay(employeeFormElements);
    var vechicleFormElements = document.getElementsByClassName("vechile-field");
    handleFormDisplay(vechicleFormElements);
    var _loop_1 = function (i) {
        if (i == 3) {
            return "continue";
        }
        document
            .getElementById("employee-field" + (i + 1))
            .addEventListener("focusout", function () {
            employeeObj.onClickNextEmployee("employee-field" + (i + 1));
        });
    };
    //employee display bind function
    for (var i = 0; i < employeeFormElements.length - 1; i++) {
        _loop_1(i);
    }
    var _loop_2 = function (i) {
        document
            .getElementById("vechicle-field" + (i + 1))
            .addEventListener("focusout", function () {
            vechicleObj.onClickNextVechile("vechicle-field" + (i + 1), employeeObj);
        });
    };
    // vechicle form bind function
    for (var i = 0; i < vechicleFormElements.length - 1; i++) {
        _loop_2(i);
    }
    var employee_password = document.getElementById("password");
    employee_password.addEventListener("keyup", employeeObj.handlePasswordKeyUp);
    document
        .getElementById("confirmPassword")
        .addEventListener("focusout", function () {
        employeeObj.onClickNextEmployee("employee-field4");
    });
};
var toggleClass = function (id) {
    document.getElementById(id).classList.toggle("hide");
};
var showMessage = function (id, message) {
    document.getElementById(id).innerHTML = message;
};
//handle form display
var handleFormDisplay = function (input, displayTag) {
    if (displayTag === void 0) { displayTag = 0; }
    for (var i = 0; i < input.length; i++) {
        input[i].classList.toggle("hide");
        if (displayTag == i) {
            input[i].classList.toggle("hide");
        }
    }
};
var Employee = /** @class */ (function () {
    function Employee() {
        this.employeeData = {
            employeeName: "",
            employeeId: "",
            gender: "",
            employeeMail: "",
            password: "",
            mobileNo: ""
        };
    }
    Employee.prototype.handleEmployeeSubmit = function () {
        var element = document.getElementById("employee-field5");
        var mobileFiled = element.childNodes[3].value;
        var messageId = "employee-message";
        var errorId = "employee-error";
        // && !isNaN(mobileFiled)
        var mobileCheckFlag = 1;
        var mobNo = mobileFiled.split("");
        var mobileFilterArray = mobNo.filter(function (num) { return isNaN(parseInt(num)) == true; });
        if (mobileFilterArray.length > 0) {
            mobileCheckFlag = 0;
        }
        if (mobileFiled.length > 8 && mobileCheckFlag == 1) {
            this.employeeData.mobileNo = mobileFiled.toString();
            toggleClass("employee-field5");
            toggleClass("employee-form");
            toggleClass("vechicle-form");
            var employee_id = Math.floor(Math.random() * 10000000).toString();
            this.employeeData.employeeId = employee_id;
            showMessage(messageId, "Welcome " +
                this.employeeData.employeeName +
                "  Your Employee Id  " +
                this.employeeData.employeeId);
        }
        else {
            if (element.childElementCount == 3) {
                showMessage(errorId, "Mobile number length Must be greater than 8 and all must be Number!");
            }
        }
    };
    Employee.prototype.handlePasswordKeyUp = function () {
        var employee_password = (document.getElementById("password"));
        var mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
        if (employee_password.value.length >= 1) {
            employee_password.style.border = "0.1rem solid red";
            employee_password.style.boxShadow = " 0 0 0.5rem red";
        }
        if (employee_password.value.match(mediumRegex)) {
            employee_password.style.border = "0.1rem solid orange";
            employee_password.style.boxShadow = " 0 0 0.5rem orange";
        }
        if (employee_password.value.match(strongRegex)) {
            employee_password.style.border = "0.1rem solid green";
            employee_password.style.boxShadow = " 0 0 0.5rem green";
        }
    };
    Employee.prototype.onClickNextEmployee = function (id) {
        console.log(this.employeeData);
        var div_element = document.getElementById(id);
        var inputFiled = div_element.childNodes[3].value;
        var elementChild = div_element.childElementCount;
        var messageId = "employee-message";
        var errorId = "employee-error";
        showMessage(errorId, "");
        switch (id) {
            case "employee-field1":
                if (inputFiled.length > 3 && inputFiled.length < 40) {
                    this.employeeData.employeeName = inputFiled;
                    toggleClass(document.getElementById(id).nextElementSibling.id);
                    toggleClass(id);
                    showMessage(messageId, "Hi ," +
                        this.employeeData.employeeName +
                        " Can i know your Gender ?");
                }
                else {
                    showMessage(errorId, "Name must be atleast 3 character long !");
                }
                break;
            case "employee-field2":
                var employee_gender = (document.querySelector('input[name="gender"]:checked')).value;
                if (employee_gender.length) {
                    this.employeeData.gender = employee_gender;
                    toggleClass(id);
                    toggleClass(document.getElementById(id).nextElementSibling.id);
                    showMessage(messageId, this.employeeData.employeeName +
                        "  Please ! Enter your Email address");
                }
                break;
            case "employee-field3":
                if (inputFiled.length > 15 &&
                    inputFiled.slice(inputFiled.length - 13) == "@metacube.com") {
                    this.employeeData.employeeMail = inputFiled;
                    toggleClass(id);
                    toggleClass(document.getElementById(id).nextElementSibling.id);
                    showMessage(messageId, this.employeeData.employeeName +
                        "  ,Please ! Enter a unique Password ");
                }
                else {
                    showMessage(errorId, "Please Enter a valid Email containing @metacube.com");
                }
                break;
            case "employee-field4":
                var password = document.getElementById("password")
                    .value;
                var confirmpassword = (document.getElementById("confirmPassword")).value;
                var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
                if (password.length > 7 &&
                    confirmpassword == password &&
                    password.match(strongRegex)) {
                    toggleClass(id);
                    this.employeeData.password = inputFiled;
                    toggleClass(document.getElementById(id).nextElementSibling.id);
                    showMessage(messageId, this.employeeData.employeeName +
                        "  Please ! Enter your mobile Number ");
                }
                else {
                    showMessage(errorId, "password Does not match OR Contain Uppercase, Lowercase, Numeric, Alphanumeric, and length minimum 8");
                }
                break;
            default:
                break;
        }
    };
    return Employee;
}());
var Vechicle = /** @class */ (function () {
    function Vechicle() {
        var _this = this;
        this.vechicleData = {
            carCompany: "",
            vechicleModel: "",
            vechicleType: "",
            vechicleNumber: "",
            purchasePlan: "",
            identification: ""
        };
        this.onClickNextVechile = function (id, employeeObj) {
            console.log(employeeObj.employeeData);
            var div_element = document.getElementById(id);
            var inputFiled = div_element.childNodes[3].value;
            var elementChild = div_element.childElementCount;
            var messageId = "vechicle-message";
            var user = employeeObj.employeeData.employeeName || "Sir";
            var errorId = "vechicle-error";
            showMessage(errorId, "");
            switch (id) {
                case "vechicle-field1":
                    if (inputFiled.length > 2 && inputFiled.length < 40) {
                        _this.vechicleData.carCompany = inputFiled;
                        toggleClass(document.getElementById(id).nextElementSibling.id);
                        toggleClass(id);
                        showMessage(messageId, user + " ! Can i know your  Vechicle Model ?");
                    }
                    else {
                        showMessage(errorId, "VEHICLE Name must be at-least 3 character long !");
                    }
                    break;
                case "vechicle-field2":
                    if (inputFiled.length > 2 && inputFiled.length < 40) {
                        _this.vechicleData.vechicleModel = inputFiled;
                        toggleClass(document.getElementById(id).nextElementSibling.id);
                        toggleClass(id);
                        showMessage(messageId, user + " ! Can i know your Vechicle Type ?");
                    }
                    else {
                        showMessage(errorId, "Please Enter your Vechicle Model !");
                    }
                    break;
                case "vechicle-field3":
                    if (inputFiled.length > 3 && inputFiled.length < 40) {
                        _this.vechicleData.vechicleType = inputFiled;
                        toggleClass(document.getElementById(id).nextElementSibling.id);
                        toggleClass(id);
                        showMessage(messageId, user + " ! Can i know your Vechicle Number ?");
                    }
                    else {
                        showMessage(errorId, "Please Enter your Vechicle Type !");
                    }
                    break;
                case "vechicle-field4":
                    if (inputFiled.length > 2 && inputFiled.length < 40) {
                        _this.vechicleData.vechicleNumber = inputFiled;
                        toggleClass(document.getElementById(id).nextElementSibling.id);
                        toggleClass(id);
                        showMessage(messageId, user + " ! Can i know your Empoyee Id ?");
                    }
                    else {
                        showMessage(errorId, "Please Enter your Vechicle Number !");
                    }
                    break;
                case "vechicle-field5":
                    if (inputFiled.length > 2 && inputFiled.length < 40) {
                        employeeObj.employeeData.employeeId = inputFiled;
                        toggleClass(document.getElementById(id).nextElementSibling.id);
                        toggleClass(id);
                        showMessage(messageId, user + " ! Can i know your Vechicle Identification ?");
                    }
                    else {
                        showMessage(errorId, "Please Enter your Employee Id !");
                    }
                    break;
                default:
                    break;
            }
        };
    }
    Vechicle.prototype.handleVechicleSubmit = function (purchagePlanObj) {
        var div_element = document.getElementById("vechicle-field6");
        var inputFiled = div_element.childNodes[3].value;
        if (inputFiled.length > 2 && inputFiled.length < 40) {
            this.vechicleData.identification = inputFiled;
            toggleClass("vechicle-field6");
            purchagePlanObj.showPlan(purchagePlanObj.plans[this.vechicleData.vechicleType]);
            toggleClass("price-plan");
            toggleClass("language");
            showMessage("vechicle-message", " You vechicle Number - " +
                this.vechicleData.vechicleNumber +
                " - is Successfully registered Now Choose your Plan !");
        }
        else {
            showMessage("vechicle-error", "Please Enter your Vechicle Identification !");
        }
    };
    return Vechicle;
}());
//price Class
var PurchasePlan = /** @class */ (function () {
    function PurchasePlan() {
        this.plans = {
            cycle: {
                heading: "cycle",
                dailyPlan: 5,
                monthlyPlan: 100,
                yearlyPlan: 500
            },
            motorCycle: {
                heading: "motorCycle",
                dailyPlan: 10,
                monthlyPlan: 200,
                yearlyPlan: 1000
            },
            fourWheeler: {
                heading: "fourWheeler",
                dailyPlan: 20,
                monthlyPlan: 500,
                yearlyPlan: 3500
            }
        };
    }
    PurchasePlan.prototype.handlePurchaseButton = function (employeeObj, vechicleObj) {
        showMessage("pass-heading", "Pass");
        showMessage("employee-id", "Employee id : " + employeeObj.employeeData.employeeId);
        showMessage("employee-vechicle", "Employee vechicle : " + vechicleObj.vechicleData.vechicleModel);
        showMessage("employee-number", "Veichicle Number : " + vechicleObj.vechicleData.vechicleNumber);
        var price = document.getElementById("choose-price").innerHTML;
        if (!vechicleObj.vechicleData.purchasePlan) {
            vechicleObj.vechicleData.purchasePlan = price + " Monthly";
        }
        showMessage("employee-plan", "Employee plan : " + vechicleObj.vechicleData.purchasePlan);
        toggleClass("pass");
        toggleClass("language");
        toggleClass("price-plan");
    };
    PurchasePlan.prototype.showPlan = function (planObject, type, multiplyValue) {
        if (type === void 0) { type = "$"; }
        if (multiplyValue === void 0) { multiplyValue = 1; }
        showMessage("plan-heading", planObject.heading);
        showMessage("choose-price", type + planObject.monthlyPlan * multiplyValue);
        showMessage("choose-plan", "/monthy");
        showMessage("dailyPlan", type + planObject.dailyPlan * multiplyValue + " daily");
        showMessage("monthlyPlan", type + planObject.monthlyPlan * multiplyValue + " monthly");
        showMessage("yearlyPlan", type + planObject.yearlyPlan * multiplyValue + " yearly");
    };
    return PurchasePlan;
}());
module.exports = { init: init };
