import { Injectable } from "@angular/core";
import { Student, StudentForm } from "./models/student";
import { Observable, concatMap, map, of } from "rxjs";
import { HttpClient } from "@angular/common/http";


const MY_BD: Student[] = [
    { id: 1, nombre: 'Tomás', nota: 8, apellido: 'García', curso: 1 },
    { id: 2, nombre: 'Nicolás', nota: 7, apellido: 'Rona', curso: 4 },
    { id: 3, nombre: 'Lucía', nota: 9, apellido: 'Perez', curso: 5 },
    { id: 4, nombre: 'Federico', nota: 5, apellido: 'Gonzales', curso: 2 },
    { id: 5, nombre: 'Abril', nota: 8, apellido: 'Sanina', curso: 1 },
    { id: 6, nombre: 'Mirko', nota: 6, apellido: 'Giralde', curso: 3 },
    { id: 7, nombre: 'Silvia', nota: 10, apellido: 'Jackson', curso: 5 },
    { id: 8, nombre: 'Carlos', nota: 7, apellido: 'Seles', curso: 4 },
];

@Injectable({ providedIn: 'root' })
export class StudentService {

    constructor(private http: HttpClient) { }

    createStudent(student: StudentForm): Observable<Student> {
        const { id, ...studentWithoutId } = student as any;
        return this.http.post<Student>(`http://localhost:3000/students`, studentWithoutId);
    }


    getStudentById(id: number): Observable<Student> {
        return this.http.get<Student>(`http://localhost:3000/students/${id}`);
    }


    getStudents(): Promise<Student[]> {
        console.log('Fetching students');

        /**
         * Asincronia
         * 
         * Promesas
         */

        const studentPromise = new Promise<Student[]>((resolve, reject) => {

            setTimeout(() => {
                reject('Error fetching students');
            }, 2000);
        });


        return studentPromise;
    }

    getStudents$(): Observable<Student[]> {

        return this.http.get<Student[]>(`http://localhost:3000/students`);
    }

    deleteStudent(id: string): Observable<Student[]> {
        return this.http.delete<Student[]>(`http://localhost:3000/students/${id}`)
            .pipe(concatMap(() =>
                this.getStudents$()));
    };

    editStudent(id: number, student: Student): Observable<Student> {
        return this.http.put<Student>(`http://localhost:3000/students/${id}`, student);
    }
}