import apiClient from "@/api/rtkquery/apiClent";

import { UpdateUserResponse } from "@/@types/user/userTyprs";



const userApi = apiClient.injectEndpoints({
   endpoints: (builder) => ({
      updateUser: builder.mutation<UpdateUserResponse, FormData>({
         query: (data) => ({
            url: "/update",
            method: "PUT",
            body: data,
         }),
      }),
   }),
})

export const { useUpdateUserMutation } = userApi;