import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  GraduationCap,
  Target,
  ClipboardList,
  TrendingUp,
  Users,
  Settings,
  History,
  LogOut,
  ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    roles: ['admin', 'faculty', 'hod', 'accreditation_officer', 'student']
  },
  {
    name: 'Academic Structure',
    href: '/academic',
    icon: GraduationCap,
    roles: ['admin', 'faculty', 'hod']
  },
  {
    name: 'Outcome Management',
    href: '/outcomes',
    icon: Target,
    roles: ['admin', 'faculty', 'hod']
  },
  {
    name: 'Assessments',
    href: '/assessments',
    icon: ClipboardList,
    roles: ['admin', 'faculty', 'hod']
  },
  {
    name: 'Attainment & Reports',
    href: '/reports',
    icon: TrendingUp,
    roles: ['admin', 'faculty', 'hod', 'accreditation_officer']
  },
  {
    name: 'User Management',
    href: '/users',
    icon: Users,
    roles: ['admin']
  },
  {
    name: 'System Settings',
    href: '/settings',
    icon: Settings,
    roles: ['admin']
  },
  {
    name: 'History & Audit',
    href: '/history',
    icon: History,
    roles: ['admin', 'hod', 'accreditation_officer']
  }
];

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, onToggle }) => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const filteredNavigation = navigation.filter(item => 
    user && item.roles.includes(user.role)
  );

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className={cn(
      "sidebar h-screen flex flex-col transition-smooth border-r border-sidebar-accent/20",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-sidebar-accent/20">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="bg-sidebar-accent p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-lg">COPO</h1>
                <p className="text-xs text-sidebar-text/70">Management System</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-sidebar-text hover:bg-sidebar-accent/20"
          >
            <ChevronLeft className={cn(
              "h-4 w-4 transition-transform",
              isCollapsed && "rotate-180"
            )} />
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {filteredNavigation.map((item) => {
          const IconComponent = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-smooth group",
                isActive(item.href)
                  ? "bg-sidebar-accent text-white"
                  : "text-sidebar-text hover:bg-sidebar-accent/20 hover:text-white"
              )}
            >
              <IconComponent className="h-5 w-5 flex-shrink-0" />
              {!isCollapsed && <span className="ml-3">{item.name}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-sidebar-accent/20">
        {!isCollapsed && user && (
          <div className="mb-3 p-3 bg-sidebar-accent/10 rounded-lg">
            <p className="text-sm font-medium text-sidebar-text">{user.username}</p>
            <p className="text-xs text-sidebar-text/70 capitalize">{user.role.replace('_', ' ')}</p>
          </div>
        )}
        <Button
          variant="ghost"
          onClick={logout}
          className={cn(
            "w-full text-sidebar-text hover:bg-sidebar-accent/20 hover:text-white",
            isCollapsed ? "px-2" : "justify-start"
          )}
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && <span className="ml-3">Sign Out</span>}
        </Button>
      </div>
    </div>
  );
};