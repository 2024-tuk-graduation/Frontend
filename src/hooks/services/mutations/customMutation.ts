import { UseMutationOptions, useMutation, MutationFunction } from "@tanstack/react-query";

export interface UseGenericMutationPropsType<TData, TError, TVariables> {
  onSuccessCb?: (data:any) => void;
  onErrorCb?: () => void;
  mutationFn: MutationFunction<TData, TVariables>; //  TData = API 응답 타입, TVariables = 요청 데이터 타입
  options?: Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'>;
}


export function useGenericMutation<TData, TError, TVariables>({
  onSuccessCb,
  onErrorCb,
  mutationFn,
  options = {},
}: UseGenericMutationPropsType<TData, TError, TVariables>) {
  const mutation = useMutation<TData, TError, TVariables>({
    ...options,
    mutationFn,
    onSuccess: (data) => {
      console.log("성공",data);
      if (onSuccessCb) onSuccessCb(data);
    },
    onError: (error) => {
      console.error(error);
      if (onErrorCb) onErrorCb();
    },
  });

  return { mutation };
}