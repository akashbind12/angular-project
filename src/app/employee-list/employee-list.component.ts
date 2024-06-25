// employee-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [
    {
        "id": 3,
        "name": "Robert Brown",
        "email": "robert.brown@example.com",
        "department": "Sales",
        "createdAt": "2024-06-24T17:58:43.000Z",
        "updatedAt": "2024-06-24T17:58:43.000Z"
    },
    {
        "id": 5,
        "name": "Michael Wilson",
        "email": "michael.wilson@example.com",
        "department": "Finance",
        "createdAt": "2024-06-24T17:59:05.000Z",
        "updatedAt": "2024-06-24T17:59:05.000Z"
    },
    {
        "id": 8,
        "name": "Laura Martinez",
        "email": "laura.martinez@example.com",
        "department": "Research and Development",
        "createdAt": "2024-06-24T17:59:30.000Z",
        "updatedAt": "2024-06-24T17:59:30.000Z"
    },
    {
        "id": 1,
        "name": "John cena",
        "email": "john.doe@example.com",
        "department": "Engineering",
        "createdAt": "2024-06-24T17:58:19.000Z",
        "updatedAt": "2024-06-24T18:06:24.000Z"
    },
    {
        "id": 6,
        "name": "Jessica Miller",
        "email": "jessica.miller@example.com",
        "department": "Customer Support",
        "createdAt": "2024-06-24T17:59:14.000Z",
        "updatedAt": "2024-06-24T17:59:14.000Z"
    }
];

  sortedEmployees: Employee[] = [];
  selectedEmployee: Employee | null = null;
  page: number = 1;
  pageSize: number = 5;
  sortField: string = 'id';
  sortOrder: string = 'asc'; 
  

  constructor(private employeeService: EmployeeService, private orderPipe: OrderPipe) { }

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees(): void {
    this.employeeService.getEmployees(this.page, this.pageSize, this.sortField, this.sortOrder).subscribe(
      (data) => {
        console.log("data: ",data)
        this.employees = data.data;
      },
      (error) => {
        console.error('Error fetching employees', error);
      }
    );
  }

  deleteEmployee(id: number): void {
    this.employeeService.deleteEmployee(id).subscribe(
      () => {
        this.fetchEmployees();
      },
      (error) => {
        alert('Error deleting employee')
        console.error('Error deleting employee', error);
      }
    );
  }

  openModal(employee: Employee | null): void {
    this.selectedEmployee = employee ? { ...employee } : { id: 0, name: '', department: '', email: '', createdAt : "", updatedAt: "" };
  }

  closeModal(): void {
    this.selectedEmployee = null;
  }

  handleFormSubmit(employee: Employee | null): void {
    if (employee) {
      if (employee.id) {
        // Update employee
        this.employeeService.updateEmployee(employee).subscribe(
          (updatedEmployee) => {
            console.log("updatedEmployee:",updatedEmployee)
            this.fetchEmployees();
          },
          (error) => {
            alert('Error updating employee')
            console.error('Error updating employee', error);
          }
        );
      } else {
        // Add employee
        this.employeeService.addEmployee(employee).subscribe(
          (newEmployee) => {
            console.log("newEmployee:",newEmployee)
            this.fetchEmployees();
          },
          (error) => {
            alert('Error adding employee')
            console.error('Error adding employee', error);
          }
        );
      }
    }
    this.closeModal();
  }

  sortEmployees(): void {
    this.fetchEmployees();
  }
}

