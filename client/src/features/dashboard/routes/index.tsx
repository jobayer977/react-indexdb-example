import DashboardPage from './DashboardPage';
import TaskDetails from './TaskDetails';

export const DashboardRoutes = [
	{ path: '', element: <DashboardPage /> },
	{
		path: 'task/:id',
		element: <TaskDetails />,
	},
];
