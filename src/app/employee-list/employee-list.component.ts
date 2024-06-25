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
  order: string = 'id';
  reverse: string = 'false'; 

  constructor(private employeeService: EmployeeService, private orderPipe: OrderPipe) { }

  ngOnInit(): void {
    this.fetchEmployees();
  }

  fetchEmployees(): void {
    // this.employeeService.getEmployees(this.page, this.pageSize, this.order, "asc").subscribe(
    //   (data) => {
    //     console.log("data: ",data)
    //     this.employees = data.data;
    //   },
    //   (error) => {
    //     console.error('Error fetching employees', error);
    //   }
    // );
    this.sortEmployees();
  }

  deleteEmployee(id: number): void {
    // this.employeeService.deleteEmployee(id).subscribe(
    //   () => {
    //     // Filter out the deleted employee from the list
    //     this.employees = this.employees.filter(e => e.id !== id);
    //   },
    //   (error) => {
    //     console.error('Error deleting employee', error);
    //   }
    // );

    // Filter out the deleted employee from the list
    console.log("id:",id)
    this.employees = this.employees.filter(e => e.id !== id);
    this.sortEmployees();
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
        // this.employeeService.updateEmployee(employee).subscribe(
        //   (updatedEmployee) => {
        //     const index = this.employees.findIndex(e => e.id === updatedEmployee.id);
        //     if (index !== -1) {
        //       this.employees[index] = updatedEmployee;
        //     }
        //   },
        //   (error) => {
        //     console.error('Error updating employee', error);
        //   }
        // );
        
        // Update employee
        const index = this.employees.findIndex(e => e.id === employee.id);
        if (index !== -1) {
          this.employees[index] = employee;
        }
      } else {
        // Add employee
        // this.employeeService.addEmployee(employee).subscribe(
        //   (newEmployee) => {
        //     this.employees.push(newEmployee);
        //   },
        //   (error) => {
        //     console.error('Error adding employee', error);
        //   }
        // );
        
        // Add employee
        employee.id = this.employees.length + 1;
        this.employees.push(employee);
      }
    }
    this.closeModal();
    this.sortEmployees();
  }

  sortEmployees(): void {
    const isReverse = this.reverse === 'true';
    this.sortedEmployees = this.orderPipe.transform(this.employees, this.order, isReverse);
  }
}

