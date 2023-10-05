// Your code here
let employee = (["Gray", "Worm", "Security", 1])
function createEmployeeRecord(employee){
    let testEmployee = {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: [],
      };
    return testEmployee;
}

//process an Array of Arrays into an Array of employee records
function createEmployeeRecords(employeeArr) {
    return employeeArr.map(createEmployeeRecord);
  }

  //it adds a timeIn event Object to an employee's record of timeInEvents 
  //when provided an employee record and Date/Time String
  //and returns the updated record
  function createTimeInEvent(employeeRecord, timestamp) {
    const [date, hour] = timestamp.split(" ");
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      date,
      hour: parseInt(hour),
    });
    return employeeRecord;
  } 

  function createTimeOutEvent(employeeRecord, timestamp) {
    const [date, hour] = timestamp.split(" ");
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      date,
      hour: parseInt(hour),
    });
    return employeeRecord;
  }

//calculates that the employee worked 2 hours
//Given an employee record with a date-matched timeInEvent and timeOutEvent
  function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(
      (event) => event.date === date
    );
    const timeOutEvent = employeeRecord.timeOutEvents.find(
      (event) => event.date === date
    );
    if (timeInEvent && timeOutEvent) {
      return (timeOutEvent.hour - timeInEvent.hour) / 100;
    }
    return 0;
  }

  //wagesEarnedOnDate
  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const hourlyRate = employeeRecord.payPerHour;
    return hoursWorked * hourlyRate;
  }

  // Function to calculate all wages for an employee
function allWagesFor(employeeRecord) {
    const dates = employeeRecord.timeInEvents.map((event) => event.date);
    const totalWages = dates.reduce((total, date) => {
      return total + wagesEarnedOnDate(employeeRecord, date);
    }, 0);
    return totalWages;
  }

  //calculates the payroll
  function calculatePayroll(employees) {
    return employees.reduce((total, employeeRecord) => {
      return total + allWagesFor(employeeRecord);
    }, 0);
  }