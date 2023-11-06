import useSwr from 'swr'
import fetcher from "../lib/fetcher";

const useUpdatePassword = () => {
    const { data, error, isLoading, mutate } = useSwr('/api/updatePassword', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
      });
      return {
        data,
        error,
        isLoading,
        mutate
      }
    };

export default useUpdatePassword;