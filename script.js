// ===============
// Check Functions
// ===============

const thirtyDaysMonth = ["04", "06", "09", "11"];
const thirtyOneDaysMonth = ["01", "03", "05", "07", "08", "10", "12"];
const errorText = document.querySelector(".error-text");
const inputInvalidDay = document.querySelector("#day-error");
const inputInvalidMonth = document.querySelector("#month-error");
const inputInvalidYear = document.querySelector("#year-error");
const inputDayElement = document.querySelector("#day");
const inputMonthElement = document.querySelector("#month");
const inputYearElement = document.querySelector("#year");
const labelForDay = document.querySelector("#for-day");
const labelForMonth = document.querySelector("#for-month");
const labelForYear = document.querySelector("#for-year");
const inputElementArray = [
  inputInvalidDay,
  inputInvalidMonth,
  inputInvalidYear,
];

// ================
// Funtions Section
// ================

function leapYearCheck() {
  let enteredYear = document.querySelector("#year").value;
  if (/\d+/.test(enteredYear)) {
    if (enteredYear % 400 == 0) {
      return 2;
    } else if (enteredYear % 100 == 0) {
      return 1;
    } else if (enteredYear % 4 == 0) {
      return 2;
    } else return 1;
  } else return 0;
}

function monthCheck() {
  let enteredMonth = document.querySelector("#month").value;
  if (/\d+/.test(enteredMonth)) {
    if (thirtyDaysMonth.includes(enteredMonth)) {
      monthErrorToggle(false);
      return 30;
    } else if (thirtyOneDaysMonth.includes(enteredMonth)) {
      monthErrorToggle(false);
      return 31;
    } else if (enteredMonth == "02") {
      monthErrorToggle(false);
      return 2;
    } else monthErrorToggle(true);
    return 0;
  } else monthErrorToggle(true);
  return 0;
}

function dayCheck() {
  let enteredDay = document.querySelector("#day").value;

  if (/\d+/.test(enteredDay)) {
    if (enteredDay < 29 && enteredDay > 0) {
      dayErrorToggle(false);
      return 28;
    } else if (enteredDay < 30 && enteredDay > 0) {
      dayErrorToggle(false);
      return 29;
    } else if (enteredDay < 31 && enteredDay > 0) {
      dayErrorToggle(false);
      return 30;
    } else if (enteredDay < 32 && enteredDay > 0) {
      dayErrorToggle(false);
      return 31;
    } else {
      dayErrorToggle(true);
      return 0;
    }
  } else {
    dayErrorToggle(true);
    return 0;
  }
}

function dayErrorToggle(binarySwitch) {
  if (inputInvalidDay.classList.contains("hidden") == binarySwitch) {
    inputDayElement.classList.toggle("invalid-input");
    labelForDay.classList.toggle("error-text-label");
    inputInvalidDay.classList.toggle("hidden");
  }
}

function monthErrorToggle(binarySwitch) {
  if (inputInvalidMonth.classList.contains("hidden") == binarySwitch) {
    inputMonthElement.classList.toggle("invalid-input");
    inputInvalidMonth.classList.toggle("hidden");
    labelForMonth.classList.toggle("error-text-label");
  }
}

function yearErrorToggle(binarySwitch) {
  if (inputInvalidYear.classList.contains("hidden") == binarySwitch) {
    inputYearElement.classList.toggle("invalid-input");
    inputInvalidYear.classList.toggle("hidden");
    labelForYear.classList.toggle("error-text-label");
  }
}

function ifNotBlank() {
  let enteredDay = document.querySelector("#day").value;
  let enteredMonth = document.querySelector("#month").value;
  let enteredYear = document.querySelector("#year").value;
  let blankCheckArray = [enteredDay, enteredMonth, enteredYear];
  let errorToggleFunction = [
    dayErrorToggle(true),
    monthErrorToggle(true),
    yearErrorToggle(true),
  ];

  if (blankCheckArray.every((element) => element.length != 0)) {
    return true;
  } else {
    for (let i = 0; i <= blankCheckArray.length; i++) {
      if (blankCheckArray[i].length == 0) {
        errorToggleFunction[i];
        inputElementArray[i].textContent = "This field is required";
      }
    }
    return false;
  }
}

function dateFormatCheck() {
  let enteredDay = document.querySelector("#day").value;
  let enteredMonth = document.querySelector("#month").value;
  let enteredYear = document.querySelector("#year").value;
  if (ifNotBlank()) {
    if (dayCheck() != 0 || monthCheck() != 0 || leapYearCheck() != 0) {
      switch (leapYearCheck()) {
        case 2:
          switch (monthCheck()) {
            case 2:
              if (enteredDay < 30 && enteredDay > 0) {
                return true;
              } else {
                dayErrorToggle(true);
                return false;
              }
            case 30:
              if (enteredDay < 31 && enteredDay > 0) {
                return true;
              } else {
                dayErrorToggle(true);
                return false;
              }
            case 31:
              if (enteredDay < 32 && enteredDay > 0) {
                return true;
              } else {
                dayErrorToggle(true);
                return false;
              }
            case 0:
              monthErrorToggle(true);
              return false;
          }
        case 1:
          switch (monthCheck()) {
            case 2:
              if (enteredDay < 29 && enteredDay > 0) {
                return true;
              } else {
                dayErrorToggle(true);
                return false;
              }
            case 30:
              if (enteredDay < 31 && enteredDay > 0) {
                return true;
              } else {
                dayErrorToggle(true);
                return false;
              }
            case 31:
              if (enteredDay < 32 && enteredDay > 0) {
                return true;
              } else {
                dayErrorToggle(true);
                return false;
              }
            case 0:
              monthErrorToggle(true);
              return false;
          }
        case 0:
          yearErrorToggle(true);
          return false;
      }
    } else yearErrorToggle(true);
    monthErrorToggle(true);
    dayErrorToggle(true);
    return false;
  } else {
    ifNotBlank();
    return false;
  }
}

function calculatedValue() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  let enteredDay = document.querySelector("#day").value;
  let enteredMonth = document.querySelector("#month").value;
  let enteredYear = document.querySelector("#year").value;
  if (dateFormatCheck()) {
    if (enteredYear <= currentYear) {
      if (currentMonth > enteredMonth) {
        console.log(currentYear - enteredYear);
        console.log(currentMonth - enteredMonth);
        console.log(currentDay - enteredDay);
      } else {
        console.log(currentYear - enteredYear - 1);
        console.log(currentMonth - enteredMonth + 12);
        console.log(currentDay - enteredDay);
      }
    } else console.log("Past Year");
  } else console.log("Invalid Date");
}
