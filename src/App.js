import React, { Component } from 'react';

import Employee from './models/Employee';

import Header from './components/Header';
import EmployeeList from './components/EmployeeList';
import EmployeeEditor from './components/EmployeeEditor';
import getEmployees from './interface/getEmployees';
import postEmployee from './interface/postEmployee';

class App extends Component {
  constructor() {
    super();
    this.state = {
      // employees: [new Employee(1, 'Bernice Ortiz', 4824931093, 'CEO'), new Employee(2, 'Marnie Barnett', 3094812387, 'CTO'), new Employee(3, 'Phillip Weaver', 7459831843, 'Manager'), new Employee(4, 'Teresa Osborne', 3841238745, 'Director of Engineering'), new Employee(5, 'Dollie Berry', 4873459812, 'Front-End Developer'), new Employee(6, 'Harriett Williamson', 6571249801, 'Front-End Developer'), new Employee(7, 'Ruby Estrada', 5740923478, 'Back-End Developer'), new Employee(8, 'Lou White', 8727813498, 'Full-Stack Developer'), new Employee(9, 'Eve Sparks', 8734567810, 'Product Manager'), new Employee(10, 'Lois Brewer', 8749823456, 'Sales Manager')],
      employees: [],
      selectedEmployee: null
    };

    this.requestEmployees = this.requestEmployees.bind(this)
    this.handleResponse = this.handleResponse.bind(this)
    this.addEmployee = this.addEmployee.bind(this)
    this.selectEmployee = this.selectEmployee.bind(this);
    this.checkID = this.checkID.bind(this);
  }
  componentDidMount() {
    this.requestEmployees()
  }

  handleResponse(response, message) {
    if (response) {
      let loadedEmployees = []
      response.forEach(employee => {
        loadedEmployees.push(new Employee(employee.employee_id, employee.employee_name, employee.employee_phone, employee.employee_title))
      })
      this.setState({ employees: loadedEmployees })
    }
    else
      alert(`Employee DB request failed with error:\n${message}`)
  }

  requestEmployees() {
    getEmployees(this.handleResponse)
  }

  addEmployee() {
    // let tempEmployees = this.state.employees;
    let id = 0
    let idValid = true
    do {
      id++
      idValid = (this.checkID(this.state.employees, id))
    } while (!idValid);
    let newEmployee = new Employee(id, 'New Employee', 1234567890, 'New Employee')
    console.log(newEmployee)
    postEmployee(newEmployee, this.handleResponse)
    // tempEmployees.push(new Employee(id, 'New Employee', 1234567890, 'New Employee'))
    // this.setState({ employees: tempEmployees })
    // this.selectEmployee(this.state.employees[this.state.employees.length - 1])
  }

  checkID(employees, id) {
    let valid = true
    employees.forEach(employee=> {
      if(employee.id === id) {
        valid = false
      }
    })
    return valid
  }

  selectEmployee(employee) {
    this.setState({ selectedEmployee: employee });
  }

  render() {
    return (
      <div id="app">
        <Header />
        <div className="main-container">
          <EmployeeList employees={this.state.employees} selectEmployee={this.selectEmployee} addEmployee={this.addEmployee} />
          <EmployeeEditor selected={this.state.selectedEmployee} handleResponse={this.handleResponse} />
        </div>
        <footer className="footer">
          Version 1.2.1
        </footer>
      </div>
    )
  }
}

export default App;
