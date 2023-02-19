import axios from "axios";
import {
    FILE_UPLOADED,
    FILE_UPLOADFAIL,
    FILE_UPLOADING,
    MODEL_LIST
} from "./types";

export const uploadModelFile = (file, navigate) => async (dispatch) => {
  const formData = new FormData();
  formData.append("fileToUpload", file);

  dispatch({
    type: FILE_UPLOADING,
  })

  axios.post("/api/models/upload", formData)
    .then((res) => {
      const { filename } = res.data;
      dispatch({
        type: FILE_UPLOADED
      });
      window.location.href = `/models/${ filename }`;
    })
    .catch(() => {
      dispatch({
        type: FILE_UPLOADFAIL,
      })
    });
};

export const getModels = () => async (dispatch) => {
  axios.get("/api/models")
    .then(res => {
      dispatch({
        type: MODEL_LIST,
        payload: res.data
      })
    });
};
