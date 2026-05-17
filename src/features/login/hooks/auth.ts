import { MutateFunctionType, MutationFunctionType } from "@/types/request";
import { useMutation } from "@tanstack/react-query"
import { postAuth } from "../services/auth";

export const useAuthMutation = ({ onError, onSuccess }: MutationFunctionType<{ access_token: string; }>) => {
    return useMutation({
        mutationFn: ({ data }: MutateFunctionType) => {
            return postAuth(data || {});
        },
        onSuccess: onSuccess,
        onError: onError
    });
}