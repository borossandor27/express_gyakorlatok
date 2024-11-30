import { expressYupMiddleware } from "express-yup-middleware";

import * as Yup from "yup";
export const ugyfelShema = Yup.object({
    body: Yup.object().shape({
      uazon: Yup.number(),
      unev: Yup.string().min(3).required(),
      uemail: Yup.string().email().required(),
      utel: Yup.string().min(3).required(),
      ujelszo: Yup.string().min(3).required(),
      uszuletett: Yup.string().min(3).required(),
      uregisztracio: Yup.string().min(3).required(),
    }),
    params: Yup.object({
      uazon: Yup.number().required(),
    }),
  
});



