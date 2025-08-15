import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { LoginForm } from "@/components/auth/LoginForm";
import { Dashboard } from "@/pages/Dashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/academic" element={
              <ProtectedRoute roles={['admin', 'faculty', 'hod']}>
                <div className="p-6"><h1 className="text-2xl font-bold">Academic Structure</h1><p className="text-muted-foreground">Manage programs, courses, and faculty assignments</p></div>
              </ProtectedRoute>
            } />
            <Route path="/outcomes" element={
              <ProtectedRoute roles={['admin', 'faculty', 'hod']}>
                <div className="p-6"><h1 className="text-2xl font-bold">Outcome Management</h1><p className="text-muted-foreground">Define and map Course Outcomes (COs), Program Outcomes (POs), and Program Specific Outcomes (PSOs)</p></div>
              </ProtectedRoute>
            } />
            <Route path="/assessments" element={
              <ProtectedRoute roles={['admin', 'faculty', 'hod']}>
                <div className="p-6"><h1 className="text-2xl font-bold">Assessment Management</h1><p className="text-muted-foreground">Create assessments and manage marks entry</p></div>
              </ProtectedRoute>
            } />
            <Route path="/reports" element={
              <ProtectedRoute roles={['admin', 'faculty', 'hod', 'accreditation_officer']}>
                <div className="p-6"><h1 className="text-2xl font-bold">Attainment & Reports</h1><p className="text-muted-foreground">View attainment metrics and generate reports</p></div>
              </ProtectedRoute>
            } />
            <Route path="/users" element={
              <ProtectedRoute roles={['admin']}>
                <div className="p-6"><h1 className="text-2xl font-bold">User Management</h1><p className="text-muted-foreground">Manage system users and permissions</p></div>
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute roles={['admin']}>
                <div className="p-6"><h1 className="text-2xl font-bold">System Settings</h1><p className="text-muted-foreground">Configure system settings and preferences</p></div>
              </ProtectedRoute>
            } />
            <Route path="/history" element={
              <ProtectedRoute roles={['admin', 'hod', 'accreditation_officer']}>
                <div className="p-6"><h1 className="text-2xl font-bold">History & Audit Trail</h1><p className="text-muted-foreground">View system activity and audit logs</p></div>
              </ProtectedRoute>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
