import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error: any) => {
        // Don't retry on 401 errors
        if (error?.response?.status === 401) {
          return false;
        }
        return failureCount < 3;
      },
    },
    mutations: {
      retry: false,
    },
  },
});

// Query keys for consistent cache management
export const queryKeys = {
  // Academic
  academicYears: ['academic-years'] as const,
  programs: (search?: string) => ['programs', { search }] as const,
  courses: (search?: string) => ['courses', { search }] as const,
  faculty: (search?: string) => ['faculty', { search }] as const,
  students: (search?: string) => ['students', { search }] as const,
  
  // Outcomes
  courseOutcomes: (search?: string) => ['course-outcomes', { search }] as const,
  programOutcomes: (search?: string) => ['program-outcomes', { search }] as const,
  programSpecificOutcomes: (search?: string) => ['program-specific-outcomes', { search }] as const,
  copoMaps: (search?: string) => ['copo-maps', { search }] as const,
  
  // Assessments
  assessments: (search?: string) => ['assessments', { search }] as const,
  marks: () => ['marks'] as const,
  
  // Reports
  attainment: (courseId: number) => ['attainment', { courseId }] as const,
  copoMatrix: (courseId?: number) => ['copo-matrix', { courseId }] as const,
  
  // Users
  users: (search?: string) => ['users', { search }] as const,
  currentUser: () => ['current-user'] as const,
};