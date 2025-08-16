import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  TrendingUp,
  Users,
  Target,
  BookOpen,
  Activity,
  FileText,
  AlertCircle,
  CheckCircle,
  BarChart3,
  PieChart
} from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer
} from 'recharts';

const DashboardCard: React.FC<{
  title: string;
  value: string | number;
  description: string;
  icon: React.ElementType;
  trend?: string;
  className?: string;
}> = ({ title, value, description, icon: Icon, trend, className }) => (
  <Card className={`card-elevated hover-lift transition-smooth ${className}`}>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
      {trend && (
        <div className="flex items-center mt-1">
          <span className="text-xs text-success">↑ {trend}</span>
        </div>
      )}
    </CardContent>
  </Card>
);

const ActivityItem: React.FC<{
  type: 'create' | 'update' | 'delete';
  entity: string;
  description: string;
  time: string;
}> = ({ type, entity, description, time }) => {
  const getIcon = () => {
    switch (type) {
      case 'create': return <CheckCircle className="h-4 w-4 text-success" />;
      case 'update': return <Activity className="h-4 w-4 text-info" />;
      case 'delete': return <AlertCircle className="h-4 w-4 text-error" />;
    }
  };

  const getBadgeClass = () => {
    switch (entity.toLowerCase()) {
      case 'co': return 'badge-co';
      case 'po': return 'badge-po';
      case 'pso': return 'badge-pso';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-fast">
      {getIcon()}
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2">
          <Badge className={`text-xs ${getBadgeClass()}`}>{entity}</Badge>
          <span className="text-sm text-muted-foreground">{time}</span>
        </div>
        <p className="text-sm font-medium text-foreground mt-1">{description}</p>
      </div>
    </div>
  );
};

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const getDashboardData = () => {
    switch (user?.role) {
      case 'admin':
        return {
          title: 'System Overview',
          cards: [
            { title: 'Total Programs', value: 15, description: 'Active academic programs', icon: BookOpen, trend: '+2 this month' },
            { title: 'Active Courses', value: 142, description: 'Courses this semester', icon: Target, trend: '+8 this month' },
            { title: 'Faculty Members', value: 87, description: 'Active faculty', icon: Users, trend: '+3 this month' },
            { title: 'CO Attainment', value: '78%', description: 'Average attainment', icon: TrendingUp, trend: '+5% this month' }
          ]
        };
      case 'faculty':
        return {
          title: 'My Courses',
          cards: [
            { title: 'My Courses', value: 4, description: 'Assigned this semester', icon: BookOpen },
            { title: 'Pending Assessments', value: 7, description: 'Assessments to grade', icon: FileText },
            { title: 'CO Mappings', value: 24, description: 'Total mappings created', icon: Target },
            { title: 'Average Attainment', value: '82%', description: 'Across all courses', icon: TrendingUp, trend: '+3% this month' }
          ]
        };
      default:
        return {
          title: 'Dashboard',
          cards: [
            { title: 'My Courses', value: 6, description: 'Enrolled courses', icon: BookOpen },
            { title: 'Assignments', value: 3, description: 'Pending submissions', icon: FileText },
            { title: 'Overall Progress', value: '85%', description: 'Course completion', icon: TrendingUp },
            { title: 'Notifications', value: 2, description: 'Unread messages', icon: Activity }
          ]
        };
    }
  };

  const dashboardData = getDashboardData();

  const recentActivities = [
    { type: 'create' as const, entity: 'CO', description: 'New Course Outcome created for Data Structures', time: '2 hours ago' },
    { type: 'update' as const, entity: 'PO', description: 'Program Outcome updated for Computer Science', time: '4 hours ago' },
    { type: 'create' as const, entity: 'Assessment', description: 'Mid-term assessment added for Database Systems', time: '6 hours ago' },
    { type: 'update' as const, entity: 'CO', description: 'CO-PO mapping updated for Software Engineering', time: '1 day ago' },
    { type: 'create' as const, entity: 'PSO', description: 'Program Specific Outcome defined', time: '2 days ago' }
  ];

  // Chart data
  const attainmentData = [
    { course: 'Data Structures', co1: 85, co2: 78, co3: 92, co4: 88 },
    { course: 'Database Systems', co1: 82, co2: 89, co3: 76, co4: 91 },
    { course: 'Software Eng.', co1: 91, co2: 84, co3: 87, co4: 79 },
    { course: 'Computer Networks', co1: 76, co2: 83, co3: 85, co4: 88 },
    { course: 'Web Technology', co1: 89, co2: 92, co3: 88, co4: 85 }
  ];

  const poAttainmentData = [
    { name: 'Engineering Knowledge', value: 85, color: 'hsl(var(--primary))' },
    { name: 'Problem Analysis', value: 78, color: 'hsl(var(--secondary))' },
    { name: 'Design Solutions', value: 82, color: 'hsl(var(--accent))' },
    { name: 'Investigation', value: 88, color: 'hsl(var(--info))' },
    { name: 'Modern Tools', value: 75, color: 'hsl(var(--warning))' }
  ];

  const trendData = [
    { month: 'Jan', attainment: 75 },
    { month: 'Feb', attainment: 78 },
    { month: 'Mar', attainment: 82 },
    { month: 'Apr', attainment: 85 },
    { month: 'May', attainment: 88 },
    { month: 'Jun', attainment: 84 }
  ];

  const chartConfig = {
    co1: { label: 'CO1', color: 'hsl(var(--primary))' },
    co2: { label: 'CO2', color: 'hsl(var(--secondary))' },
    co3: { label: 'CO3', color: 'hsl(var(--accent))' },
    co4: { label: 'CO4', color: 'hsl(var(--info))' },
    attainment: { label: 'Attainment %', color: 'hsl(var(--primary))' }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {user?.username}!
        </h1>
        <p className="text-muted-foreground">
          {dashboardData.title} - Here's what's happening with your academic outcomes.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {dashboardData.cards.map((card, index) => (
          <DashboardCard key={index} {...card} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* CO Attainment Chart */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Course Outcome Attainment
            </CardTitle>
            <CardDescription>CO-wise attainment across courses</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <BarChart data={attainmentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="course" className="text-xs" />
                <YAxis domain={[0, 100]} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="co1" fill="var(--color-co1)" radius={[2, 2, 0, 0]} />
                <Bar dataKey="co2" fill="var(--color-co2)" radius={[2, 2, 0, 0]} />
                <Bar dataKey="co3" fill="var(--color-co3)" radius={[2, 2, 0, 0]} />
                <Bar dataKey="co4" fill="var(--color-co4)" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* PO Attainment Distribution */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Program Outcome Distribution
            </CardTitle>
            <CardDescription>PO attainment breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[300px]">
              <RechartsPieChart>
                <ChartTooltip 
                  content={<ChartTooltipContent 
                    formatter={(value) => [`${value}%`, 'Attainment']}
                  />} 
                />
                <Pie
                  data={poAttainmentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {poAttainmentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartLegend 
                  content={<ChartLegendContent />}
                  payload={poAttainmentData.map(item => ({
                    value: item.name,
                    color: item.color
                  }))}
                />
              </RechartsPieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Attainment Trend */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Attainment Trend Analysis
          </CardTitle>
          <CardDescription>Monthly attainment trends over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[200px]">
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="attainment" 
                stroke="var(--color-attainment)" 
                strokeWidth={3}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Quick Actions */}
        <Card className="card-elevated">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Frequently used actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {user?.role === 'admin' && (
              <>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Users
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Add New Course
                </Button>
              </>
            )}
            {(user?.role === 'faculty' || user?.role === 'hod') && (
              <>
                <Button variant="outline" className="w-full justify-start">
                  <Target className="mr-2 h-4 w-4" />
                  Create CO Mapping
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  Add Assessment
                </Button>
              </>
            )}
            <Button variant="outline" className="w-full justify-start">
              <TrendingUp className="mr-2 h-4 w-4" />
              View Reports
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="card-elevated lg:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest changes in the system</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentActivities.map((activity, index) => (
              <ActivityItem key={index} {...activity} />
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Role-specific sections */}
      {user?.role === 'admin' && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>System Health</CardTitle>
              <CardDescription>System status and alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database Status</span>
                  <Badge className="bg-success/10 text-success">Healthy</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">API Response Time</span>
                  <Badge className="bg-success/10 text-success">120ms</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Sessions</span>
                  <Badge className="bg-info/10 text-info">24</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-elevated">
            <CardHeader>
              <CardTitle>Pending Reviews</CardTitle>
              <CardDescription>Items requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Course Approvals</span>
                  <Badge className="bg-warning/10 text-warning">3</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Faculty Requests</span>
                  <Badge className="bg-warning/10 text-warning">2</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">System Updates</span>
                  <Badge className="bg-info/10 text-info">1</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};