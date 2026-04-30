import EmptyStateScreen from "./empty-state-screen";
import { Spinner } from "./spinner";

type QueryStateHandlerProps = {
  isLoading: boolean;
  isError: boolean;
  data?: any[];
  loadingMessage?: string;
  errorMessage?: string;
  emptyMessage?: string;
  children: React.ReactNode;
  isFetching?: boolean;
  fetchingMessage?: string;
  imageUrl?: string;
  queryErrorMessage?: string;
};

export default function QueryStateHandler({
  isLoading,
  isError,
  data,
  loadingMessage = "Loading...",
  errorMessage = "Failed to load data",
  emptyMessage = "No data available",
  children,
  isFetching,
  fetchingMessage,
  imageUrl = "",
  queryErrorMessage,
}: QueryStateHandlerProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center flex items-center justify-center flex-col gap-6">
          <Spinner size={40} />
          <p className="mt-2 text-sm text-secondary-text">{loadingMessage}</p>
        </div>
      </div>
    );
  }
  if (isFetching && (!data || data.length === 0)) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center flex items-center justify-center flex-col gap-6">
          {/* <Spinner size={40} /> */}
          <p className="mt-2 text-sm text-secondary-text">{fetchingMessage}</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 text-center bg-destructive/5 rounded-xl border border-destructive/20">
        <p className="text-destructive font-medium">{errorMessage}</p>
        <p className="text-sm text-secondary-text mt-1">{queryErrorMessage}</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <EmptyStateScreen
          isBtn={false}
          image={imageUrl}
          alt="Empty state"
          title={emptyMessage}
        />
      </div>
    );
  }

  return <>{children}</>;
}
