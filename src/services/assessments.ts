import { apiClient, ApiResponse } from './api';

export interface Assessment {
  id: number;
  name: string;
  assessment_type: 'exam' | 'assignment' | 'quiz' | 'lab';
  weight: number;
  course: number;
  cos: number[];
}

export interface Marks {
  id: number;
  mark: number;
  student: number;
  assessment: number;
}

export const assessmentsService = {
  // Assessments
  getAssessments: async (search?: string): Promise<ApiResponse<Assessment>> => {
    const params = search ? { search } : {};
    const response = await apiClient.get<ApiResponse<Assessment>>('/assessments/', { params });
    return response.data;
  },

  createAssessment: async (data: Omit<Assessment, 'id'>): Promise<Assessment> => {
    const response = await apiClient.post<Assessment>('/assessments/', data);
    return response.data;
  },

  updateAssessment: async (id: number, data: Partial<Assessment>): Promise<Assessment> => {
    const response = await apiClient.patch<Assessment>(`/assessments/${id}/`, data);
    return response.data;
  },

  deleteAssessment: async (id: number): Promise<void> => {
    await apiClient.delete(`/assessments/${id}/`);
  },

  // Marks
  getMarks: async (): Promise<ApiResponse<Marks>> => {
    const response = await apiClient.get<ApiResponse<Marks>>('/marks/');
    return response.data;
  },

  createMarks: async (data: Omit<Marks, 'id'>): Promise<Marks> => {
    const response = await apiClient.post<Marks>('/marks/', data);
    return response.data;
  },

  updateMarks: async (id: number, data: Partial<Marks>): Promise<Marks> => {
    const response = await apiClient.patch<Marks>(`/marks/${id}/`, data);
    return response.data;
  },

  deleteMarks: async (id: number): Promise<void> => {
    await apiClient.delete(`/marks/${id}/`);
  },

  // Bulk upload marks
  bulkUploadMarks: async (data: Omit<Marks, 'id'>[]): Promise<Marks[]> => {
    const response = await apiClient.post<Marks[]>('/marks/bulk-upload/', data);
    return response.data;
  },
};