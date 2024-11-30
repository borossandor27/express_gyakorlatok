//import { expressYupMiddleware } from "express-yup-middleware";

import { query, params, body } from "express";
import * as Yup from "yup";
const today = new Date();
const minDate = new Date(
  today.getFullYear() - 18,
  today.getMonth(),
  today.getDate()
);
const maxDate = new Date(
  today.getFullYear() - 200,
  today.getMonth(),
  today.getDate()
);
export const ugyfelShema = Yup.object({
  body: Yup.object({
    uazon: Yup.number(),
    unev: Yup.string()
      .min(3, "legalább 3 karakter")
      .required("A név megadása kötelező."), // legalább 3 karakter
    uemail: Yup.string().email().required("Az e-mail cím megadása kötelező."),
    utel: Yup.string().min(7).required("A telefonszám megadása kötelező."),
    ujelszo: Yup.string()
      .min(6, "legalább 6 karakter")
      .required("A jelszó megadása kötelező."),
    uszuletett: Yup.date()
      .required("A születési dátum megadása kötelező.")
      .test(
        'is-18',
        'Legalább 18 évesnek kell lenned.',
        (value) => {
          if (!value) return false;
          const today = new Date();
          const minDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
          return value <= minDate;
        }
      ), // 18 évnél idősebb
  }),
  params: Yup.object({
    uazon: Yup.number().required("Événytelen azonosító!"),
  })
});
