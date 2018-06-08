import React, { Component } from 'react';
import putEmployee from '../interface/putEmployee';

class EmployeeEditor extends Component {
  constructor() {
    super();
    this.state = {
      employee: null,
      originalEmployee: null,
      notModified: true
    };

    this.nameInvalid = false;
    this.phoneInvalid = false;
    this.titleInvalid = false;

    this.errorMessage = ''

    this.save = this.save.bind(this);
    this.cancel = this.cancel.bind(this);
    this.validate = this.validate.bind(this);
  }

  componentWillReceiveProps(props) {
    if (props.selected)
      this.setState({ employee: Object.assign({}, props.selected), originalEmployee: props.selected, notModified: true });
  }

  handleChange(prop, val) {
    if (this.state.notModified) {
      this.setState({ notModified: false });
    }

    var employeeCopy = Object.assign({}, this.state.employee);
    employeeCopy[prop] = val;
    this.setState({ employee: employeeCopy });
  }

  save() {
    if (this.validate()) {
      this.state.originalEmployee.updateName(this.state.employee.name);
      this.state.originalEmployee.updatePhone(this.state.employee.phone);
      this.state.originalEmployee.updateTitle(this.state.employee.title);
      this.setState({ notModified: true });
      putEmployee(this.state.originalEmployee, this.props.handleResponse)
    }
    else
      this.forceUpdate();
  }

  validate() {
    this.errorMessage = '';
    if (this.state.employee.name.length < 1 || this.state.employee.name.length > 30) {
      this.nameInvalid = true;
      // document.getElementsByName('nameEntry')[0].classList.add("invalidInfo")
      this.errorMessage += 'The name field must be between 1 and 30 characters long. \n'
    }
    else
      this.nameInvalid = false
    if (!/^\d{10}$/.test(this.state.employee.phone)) {
      this.phoneInvalid = true;
      // document.getElementsByName('titleEntry')[0].classList.add("invalidInfo")
      this.errorMessage += 'The phone number must be 10 digits long. \n'
    }
    else
      this.phoneInvalid = false
    if (this.state.employee.title.length < 1 || this.state.employee.name.length > 30) {
      this.titleInvalid = true;
      // document.getElementsByName('phoneEntry')[0].classList.add("invalidInfo")
      this.errorMessage += 'The title field must be between 1 and 30 characters long. \n'
    }
    else
      this.titleInvalid = false
    if (this.nameInvalid || this.titleInvalid || this.phoneInvalid) {
      return false
    }
    else {
      return true
    }
  }

  cancel() {
    this.nameInvalid = false;
    this.phoneInvalid = false;
    this.titleInvalid = false;
    this.errorMessage = '';
    var employeeCopy = Object.assign({}, this.state.originalEmployee);
    this.setState({ employee: employeeCopy, notModified: true });
  }

  render() {
    return (
      <div>
        <div className="infoCard">
          {
            this.state.employee
              ?

              <div>
                <span name='employeeID' id="employeeID"> ID: {this.state.employee.id} </span>
                <p name='employeeName' id="employeeTitle"> {this.state.originalEmployee.name} </p>
                <br />
                <button name='save' id="saveBtn" className="confirmationButton" disabled={this.state.notModified} onClick={this.save}> Save </button>
                <button name='cancel' className="neutralButton" disabled={this.state.notModified} onClick={this.cancel}> Cancel </button>
                <br />
                <span className="placeholderText"> Name </span>
                <input name='nameEntry' className={this.nameInvalid ? "materialInput invalidInfo" : "materialInput"} value={this.state.employee.name} onChange={(e) => { this.handleChange('name', e.target.value) }}></input>
                <span className="placeholderText"> Phone Number </span>
                <input name='phoneEntry' className={this.phoneInvalid ? "materialInput invalidInfo" : "materialInput"} value={this.state.employee.phone} onChange={(e) => { this.handleChange('phone', e.target.value) }}></input>
                <span className="placeholderText"> Title </span>
                <input name='titleEntry' className={this.titleInvalid ? "materialInput invalidInfo" : "materialInput"} value={this.state.employee.title} onChange={(e) => { this.handleChange('title', e.target.value) }}></input>
              </div>
              :
              <p id="noEmployee"> No Employee Selected </p>
          }

        </div>
        <div className={this.errorMessage === '' ? "hidden" : "errorCard"}>
          <span className="errorMessage"> {this.errorMessage.split('\n').map((string, i) => <div key={i}>{string}</div>)} </span>
        </div>
      </div>
    )
  }
}

export default EmployeeEditor;