import {
    useQuery,
    useMutation,
    useQueryClient
} from "@tanstack/react-query";
import {
    userLoginApi,
    userRegisterApi,
    userAllGetApi
} from "../apis/user.api";

export const useLoginUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: userLoginApi,
        onSuccess: (user) => {
            localStorage.setItem(
                "currentUser",
                JSON.stringify(user)
            );
            queryClient.setQueryData(
                ["user"],
                user
            );
        }
    })
}

export const useRegisterUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: userRegisterApi
    })
}

export const logout = () => {
    localStorage.removeItem("currentUser")
}

export const getCurrentUser = () => {
    const user = localStorage.getItem("currentUser")
    return user && JSON.parse(user)
}