import { BrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryClientProvider } from 'react-query';
import React from 'react';
import { Spin } from 'antd';
import { queryClient } from '../config';
const ErrorFallback = () => {
	return (
		<div
			className='text-red-500 w-screen h-screen flex flex-col justify-center items-center'
			role='alert'
		>
			<h2 className='text-lg font-semibold'>Ooops, something went wrong :( </h2>
			<button
				className='mt-4'
				onClick={() => window.location.assign(window.location.origin)}
			>
				Refresh
			</button>
		</div>
	);
};
type AppProviderProps = {
	children: React.ReactNode;
};
export const AppProvider = ({ children }: AppProviderProps) => {
	return (
		<React.Suspense
			fallback={
				<div className='h-screen w-screen flex items-center justify-center'>
					<Spin />
				</div>
			}
		>
			<ErrorBoundary FallbackComponent={ErrorFallback}>
				<QueryClientProvider client={queryClient}>
					<BrowserRouter>{children}</BrowserRouter>
				</QueryClientProvider>
			</ErrorBoundary>
		</React.Suspense>
	);
};
