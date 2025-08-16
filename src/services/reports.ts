import { apiClient } from './api';

export interface AttainmentData {
  course_id: number;
  co_attainment: Array<{
    co_id: number;
    attainment_level: number;
    percentage: number;
  }>;
  po_attainment: Array<{
    po_id: number;
    attainment_level: number;
    percentage: number;
  }>;
}

export interface COPOMatrix {
  course_id: number;
  matrix: Array<{
    co_code: string;
    po_mappings: Array<{
      po_code: string;
      weightage: number;
    }>;
    pso_mappings: Array<{
      pso_code: string;
      weightage: number;
    }>;
  }>;
}

export const reportsService = {
  // Calculate attainment for a course
  calculateAttainment: async (courseId: number): Promise<AttainmentData> => {
    const response = await apiClient.get<AttainmentData>(`/attainments/calculate/?course_id=${courseId}`);
    return response.data;
  },

  // Get CO-PO matrix
  getCOPOMatrix: async (courseId?: number): Promise<COPOMatrix> => {
    const params = courseId ? `?course_id=${courseId}` : '';
    const response = await apiClient.get<COPOMatrix>(`/reports/co-po-matrix/${params}`);
    return response.data;
  },

  // Health check
  healthCheck: async (): Promise<{ status: string }> => {
    const response = await apiClient.get<{ status: string }>('/health/');
    return response.data;
  },
};