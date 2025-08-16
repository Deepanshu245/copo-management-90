import { apiClient, ApiResponse } from './api';

export interface CourseOutcome {
  id: number;
  code: string;
  description: string;
  blooms_level: 'remember' | 'understand' | 'apply' | 'analyze' | 'evaluate' | 'create';
  course: number;
}

export interface ProgramOutcome {
  id: number;
  code: string;
  description: string;
  program: number;
}

export interface ProgramSpecificOutcome {
  id: number;
  code: string;
  description: string;
  program: number;
}

export interface COPOMap {
  id: number;
  outcome_type: 'PO' | 'PSO';
  outcome_id: number;
  weightage: 1 | 2 | 3;
  co: number;
}

export const outcomesService = {
  // Course Outcomes
  getCourseOutcomes: async (search?: string): Promise<ApiResponse<CourseOutcome>> => {
    const params = search ? { search } : {};
    const response = await apiClient.get<ApiResponse<CourseOutcome>>('/cos/', { params });
    return response.data;
  },

  createCourseOutcome: async (data: Omit<CourseOutcome, 'id'>): Promise<CourseOutcome> => {
    const response = await apiClient.post<CourseOutcome>('/cos/', data);
    return response.data;
  },

  updateCourseOutcome: async (id: number, data: Partial<CourseOutcome>): Promise<CourseOutcome> => {
    const response = await apiClient.patch<CourseOutcome>(`/cos/${id}/`, data);
    return response.data;
  },

  deleteCourseOutcome: async (id: number): Promise<void> => {
    await apiClient.delete(`/cos/${id}/`);
  },

  // Program Outcomes
  getProgramOutcomes: async (search?: string): Promise<ApiResponse<ProgramOutcome>> => {
    const params = search ? { search } : {};
    const response = await apiClient.get<ApiResponse<ProgramOutcome>>('/pos/', { params });
    return response.data;
  },

  createProgramOutcome: async (data: Omit<ProgramOutcome, 'id'>): Promise<ProgramOutcome> => {
    const response = await apiClient.post<ProgramOutcome>('/pos/', data);
    return response.data;
  },

  updateProgramOutcome: async (id: number, data: Partial<ProgramOutcome>): Promise<ProgramOutcome> => {
    const response = await apiClient.patch<ProgramOutcome>(`/pos/${id}/`, data);
    return response.data;
  },

  deleteProgramOutcome: async (id: number): Promise<void> => {
    await apiClient.delete(`/pos/${id}/`);
  },

  // Program Specific Outcomes
  getProgramSpecificOutcomes: async (search?: string): Promise<ApiResponse<ProgramSpecificOutcome>> => {
    const params = search ? { search } : {};
    const response = await apiClient.get<ApiResponse<ProgramSpecificOutcome>>('/psos/', { params });
    return response.data;
  },

  createProgramSpecificOutcome: async (data: Omit<ProgramSpecificOutcome, 'id'>): Promise<ProgramSpecificOutcome> => {
    const response = await apiClient.post<ProgramSpecificOutcome>('/psos/', data);
    return response.data;
  },

  updateProgramSpecificOutcome: async (id: number, data: Partial<ProgramSpecificOutcome>): Promise<ProgramSpecificOutcome> => {
    const response = await apiClient.patch<ProgramSpecificOutcome>(`/psos/${id}/`, data);
    return response.data;
  },

  deleteProgramSpecificOutcome: async (id: number): Promise<void> => {
    await apiClient.delete(`/psos/${id}/`);
  },

  // COPO Mapping
  getCOPOMaps: async (search?: string): Promise<ApiResponse<COPOMap>> => {
    const params = search ? { search } : {};
    const response = await apiClient.get<ApiResponse<COPOMap>>('/copo-maps/', { params });
    return response.data;
  },

  createCOPOMap: async (data: Omit<COPOMap, 'id'>): Promise<COPOMap> => {
    const response = await apiClient.post<COPOMap>('/copo-maps/', data);
    return response.data;
  },

  updateCOPOMap: async (id: number, data: Partial<COPOMap>): Promise<COPOMap> => {
    const response = await apiClient.patch<COPOMap>(`/copo-maps/${id}/`, data);
    return response.data;
  },

  deleteCOPOMap: async (id: number): Promise<void> => {
    await apiClient.delete(`/copo-maps/${id}/`);
  },
};