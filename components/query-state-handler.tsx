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
  isFetching?: boolean
  fetchingMessage?: string,
  imageUrl?: string
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
  imageUrl = ""
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
  if (isFetching) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center flex items-center justify-center flex-col gap-6">
          <Spinner size={40} />
          <p className="mt-2 text-sm text-secondary-text">{fetchingMessage}</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <h3 className="font-bold text-secondary-text mb-1">{errorMessage}</h3>
        </div>
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
