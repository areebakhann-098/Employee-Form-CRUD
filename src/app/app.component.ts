import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeService } from './services/employee.service';
import { EmployeeModel } from './models/employee.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  employeeForm: FormGroup = new FormGroup({});
  employeeList: EmployeeModel[] = [];
  selectedEmployee: EmployeeModel | null = null;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.createForm();
  }

  loadEmployees(): void {
    this.employeeList = this.employeeService.getEmployees();
  }

  createForm() {
    this.employeeForm = new FormGroup({
      empId: new FormControl(null),
      name: new FormControl(''),
      city: new FormControl(''),
      address: new FormControl(''),
      contactNo: new FormControl(''),
      emailId: new FormControl(''),
      pincode: new FormControl('')
    });
  }

  onSave() {
    if (this.employeeForm.valid) {
      this.employeeService.addEmployee(this.employeeForm.value);
      this.loadEmployees();
      this.createForm();
    }
  }

  onEdit(employee: EmployeeModel) {
    this.selectedEmployee = employee;
    this.employeeForm.setValue({ ...employee });
  }

  onUpdate() {
    if (this.selectedEmployee) {
      this.employeeService.updateEmployee(this.employeeForm.value);
      this.loadEmployees();
      this.selectedEmployee = null;
      this.createForm();
    }
  }

  onDelete(empId: number) {
    this.employeeService.deleteEmployee(empId);
    this.loadEmployees();
  }
}
