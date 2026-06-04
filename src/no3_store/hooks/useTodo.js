import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
    todoAllGetApi,
    todoDeleteApi,
    todoGetApi,
    todoPostApi,
    todoPutApi
} from "../apis/todo.api";

export const useAllGetTodo = () => {
    return useQuery({
        queryKey: ["todos"],
        queryFn: todoAllGetApi
    })
}

export const useGetTodo = (id) => {
    return useQuery({
        queryKey: ["todos", id],
        queryFn: () => todoGetApi(id),
        enabled: !!id
    })
}

export const usePostRegisterTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: todoPostApi,
        onSuccess: (dataObj) => {
            queryClient.setQueryData(
                ["todos"],
                (oldData = []) => [
                    ...oldData, dataObj
                ]
            )
            // 캐시 제거, 데이터 다시 불러오기
            queryClient.invalidateQueries({
                queryKey: ["todos", dataObj.id]
            })
        }
    })
}

export const usePutUpdateTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: todoPutApi,
        onSuccess: (dataObj) => {
            queryClient.setQueryData(
                ["todos"],
                (old = []) => old.map(item =>
                    item.id === dataObj.id ?
                        dataObj : item
                )
            );
            queryClient.invalidateQueries({
                queryKey: ["todos", dataObj.id]
            });
        }
    })
}

export const useDeleteTodo = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: todoDeleteApi,
        onSuccess: (id) => {
            queryClient.setQueryData(
                ["todos"],
                (old = []) => old.filter(item =>
                    item.id !== id
                )
            );
            queryClient.removeQueries({
                queryKey: ["todos", id]
            });
        }
    })
}