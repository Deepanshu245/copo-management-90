import { apiClient, ApiResponse } from './api';

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'faculty' | 'hod' | 'accreditation_officer' | 'student';
  password?: string;
}

export const usersService = {
  // Get all users
  getUsers: async (search?: string): Promise<ApiResponse<User>> => {
    const params = search ? { search } : {};
    const response = await apiClient.get<ApiResponse<User>>('/users/', { params });
    return response.data;
  },

  // Get user by ID
  getUser: async (id: number): Promise<User> => {
    const response = await apiClient.get<User>(`/users/${id}/`);
    return response.data;
  },

  // Create user
  createUser: async (data: Omit<User, 'id'>): Promise<User> => {
    const response = await apiClient.post<User>('/users/', data);
    return response.data;
  },

  // Update user
  updateUser: async (id: number, data: Partial<User>): Promise<User> => {
    const response = await apiClient.patch<User>(`/users/${id}/`, data);
    return response.data;
  },

  // Delete user
  deleteUser: async (id: number): Promise<void> => {
    await apiClient.delete(`/users/${id}/`);
  },

  // Get current user
  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get<User>('/users/me/');
    return response.data;
  },
};