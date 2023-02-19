import { QueryClient, UseMutationOptions, UseQueryOptions } from "react-query"

import { AxiosError } from "axios"
import { PromiseValue } from "type-fest"

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			useErrorBoundary: true,
			refetchOnWindowFocus: false,
			retry: false,
		},
	},
})
export type QueryConfig<FetcherFnType extends (...args: any) => any> =
	UseQueryOptions<PromiseValue<ReturnType<FetcherFnType>>>

export type MutationConfig<FetcherFnType extends (...args: any) => any> =
	UseMutationOptions<
		PromiseValue<ReturnType<FetcherFnType>>,
		AxiosError,
		Parameters<FetcherFnType>[0]
	>
