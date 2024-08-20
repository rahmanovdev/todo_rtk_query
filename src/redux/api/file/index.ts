import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (build) => ({
    uploadFile: build.mutation<FILE.UploadFileResponse, FILE.UploadFileRequest>(
      {
        query: (data) => ({
          url: `/upload/file`,
          method: "POST",
          body: data,
        }),
        //   invalidatesTags: ["file"],
      }
    ),
  }),
});

export const { useUploadFileMutation } = api;
