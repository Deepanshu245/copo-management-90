import { apiClient, ApiResponse } from './api';

export interface AcademicYear {
  id: number;
  start_year: number;
  end_year: number;
}

export interface Program {
  id: number;
  name: string;
  code: string;
  academic_year: number;
}

export interface Course {
  id: number;
  code: string;
  name: string;
  semester: number;
  credits: number;
  syllabus: string;
  program: number;
  faculty: number[];
}

export interface Faculty {
  id: number;
  department: string;
  user: number;
}

export interface Student {
  id: number;
  roll_number: string;
  user: number;
  program: number;
}

export const academicService = {
  // Academic Years
  getAcademicYears: async (): Promise<ApiResponse<AcademicYear>> => {
    const response = await apiClient.get<ApiResponse<AcademicYear>>('/academic-years/');
    return response.data;
  },

  createAcademicYear: async (data: Omit<AcademicYear, 'id'>): Promise<AcademicYear> => {
    const response = await apiClient.post<AcademicYear>('/academic-years/', data);
    return response.data;
  },

  updateAcademicYear: async (id: number, data: Partial<AcademicYear>): Promise<AcademicYear> => {
    const response = await apiClient.patch<AcademicYear>(`/academic-years/${id}/`, data);
    return response.data;
  },

  deleteAcademicYear: async (id: number): Promise<void> => {
    await apiClient.delete(`/academic-years/${id}/`);
  },

  // Programs
  getPrograms: async (search?: string): Promise<ApiResponse<Program>> => {
    const params = search ? { search } : {};
    const response = await apiClient.get<ApiResponse<Program>>('/programs/', { params });
    return response.data;
  },

  createProgram: async (data: Omit<Program, 'id'>): Promise<Program> => {
    const response = await apiClient.post<Program>('/programs/', data);
    return response.data;
  },

  updateProgram: async (id: number, data: Partial<Program>): Promise<Program> => {
    const response = await apiClient.patch<Program>(`/programs/${id}/`, data);
    return response.data;
  },

  deleteProgram: async (id: number): Promise<void> => {
    await apiClient.delete(`/programs/${id}/`);
  },

  // Courses
  getCourses: async (search?: string): Promise<ApiResponse<Course>> => {
    const params = search ? { search } : {};
    const response = await apiClient.get<ApiResponse<Course>>('/courses/', { params });
    return response.data;
  },

  createCourse: async (data: Omit<Course, 'id'>): Promise<Course> => {
    const response = await apiClient.post<Course>('/courses/', data);
    return response.data;
  },

  updateCourse: async (id: number, data: Partial<Course>): Promise<Course> => {
    const response = await apiClient.patch<Course>(`/courses/${id}/`, data);
    return response.data;
  },

  deleteCourse: async (id: number): Promise<void> => {
    await apiClient.delete(`/courses/${id}/`);
  },

  // Faculty
  getFaculty: async (search?: string): Promise<ApiResponse<Faculty>> => {
    const params = search ? { search } : {};
    const response = await apiClient.get<ApiResponse<Faculty>>('/faculty/', { params });
    return response.data;
  },

  createFaculty: async (data: Omit<Faculty, 'id'>): Promise<Faculty> => {
    const response = await apiClient.post<Faculty>('/faculty/', data);
    return response.data;
  },

  updateFaculty: async (id: number, data: Partial<Faculty>): Promise<Faculty> => {
    const response = await apiClient.patch<Faculty>(`/faculty/${id}/`, data);
    return response.data;
  },

  deleteFaculty: async (id: number): Promise<void> => {
    await apiClient.delete(`/faculty/${id}/`);
  },

  // Students
  getStudents: async (search?: string): Promise<ApiResponse<Student>> => {
    const params = search ? { search } : {};
    const response = await apiClient.get<ApiResponse<Student>>('/students/', { params });
    return response.data;
  },

  createStudent: async (data: Omit<Student, 'id'>): Promise<Student> => {
    const response = await apiClient.post<Student>('/students/', data);
    return response.data;
  },

  updateStudent: async (id: number, data: Partial<Student>): Promise<Student> => {
    const response = await apiClient.patch<Student>(`/students/${id}/`, data);
    return response.data;
  },

  deleteStudent: async (id: number): Promise<void> => {
    await apiClient.delete(`/students/${id}/`);
  },
};