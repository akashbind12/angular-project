// employee.model.ts
export interface Employee {
    id: number;
    name: string;
    email: string;
    department: string;
    createdAt: String;
    updatedAt: String;
}

export interface PaginatedResponse {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    data: Employee[];
}

// "id": 3,
// "name": "Robert Brown",
// "email": "robert.brown@example.com",
// "department": "Sales",
// "createdAt": "2024-06-24T17:58:43.000Z",
// "updatedAt": "2024-06-24T17:58:43.000Z"