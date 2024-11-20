import { RouterProvider } from "@tanstack/react-router";
import "./App.css";
import { router } from "./router.config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: 1000,
    },
  },
});

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools
        initialIsOpen={false}
        position="right"
        buttonPosition="bottom-right"
      />
    </QueryClientProvider>
  );
}

export default App;
