import React, { Component } from 'react';

let newEmployeePresent = employees => {
  let exists = false
  employees.forEach(employee => {
    if (employee.name === "New Employee")
      exists = true
  })
  return exists
}

class EmployeeList extends Component {
  render() {
    if (this.props.employees)
      return (
        <div>
          <ul className="listContainer">
            {
              this.props.employees.map((employee) => {
                return (
                  <li name={'employee' + employee.id} className="listText" key={employee.name + employee.id} onClick={() => { this.props.selectEmployee(employee) }}> {employee.name} </li>
                )
              })
            }
            {
              newEmployeePresent(this.props.employees) ? null :
                <li name='addEmployee' className="listText" onClick={() => { this.props.addEmployee() }}> &#43; Add Employee </li>
            }
          </ul>
        </div>
      )
    else return null
  }
}

export default EmployeeList;