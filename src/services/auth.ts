import { apiClient } from './api';
import { User } from '@/contexts/AuthContext';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
}

export interface UserProfile extends User {
  id: number;
  username: string;
  email: string;
  role: 'admin' | 'faculty' | 'hod' | 'accreditation_officer' | 'student';
}

export const authService = {
  // Login user
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/token/', credentials);
    return response.data;
  },

  // Get current user profile
  getCurrentUser: async (): Promise<UserProfile> => {
    const response = await apiClient.get<UserProfile>('/users/me/');
    return response.data;
  },

  // Refresh token
  refreshToken: async (refreshToken: string): Promise<{ access: string }> => {
    const response = await apiClient.post<{ access: string }>('/token/refresh/', {
      refresh: refreshToken,
    });
    return response.data;
  },

  // Register user (if needed)
  register: async (userData: Partial<UserProfile>): Promise<UserProfile> => {
    const response = await apiClient.post<UserProfile>('/users/register/', userData);
    return response.data;
  },
};