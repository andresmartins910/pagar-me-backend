import * as yup from "yup";
import {
  validateCPF,
  validatePhone,
  validateUF,
  validateCep,
} from "validations-br";

const registerCustomer = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  document: yup
    .string()
    .required()
    .test("is-cpf", "CPF is not valid", (cpf) => validateCPF(cpf)),
  type: yup.string().required(),
  phones: yup
    .array()
    .of(
      yup
        .string()
        .required()
        .test(
          "is-phone",
          "Phone number is not valid. Format: (xx) xxxxx-xxxx",
          (phone) => validatePhone(phone)
        )
    )
    .required(),
  birthday: yup
    .string()
    .required()
    .matches(
      /^(((0[1-9]|[12]\d|3[01])\/(0[13578]|1[02])\/((19|[2-9]\d)\d{2}))|((0[1-9]|[12]\d|30)\/(0[13456789]|1[012])\/((19|[2-9]\d)\d{2}))|((0[1-9]|1\d|2[0-8])\/02\/((19|[2-9]\d)\d{2}))|(29\/02\/((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|(([1][26]|[2468][048]|[3579][26])00))))$/g,
      "Invalid format. Example: dd/mm/aaaa"
    ),
  funds: yup.number().required(),
  address: yup.object().shape({
    address1: yup.string().required(),
    address2: yup.string().required(),
    city: yup.string().required(),
    state: yup
      .string()
      .required()
      .test("is-uf", "UF is not valid. Format: xxxxx-xxx", (uf) =>
        validateUF(uf)
      ),
    zip: yup
      .string()
      .required()
      .test("is-zip", "ZIP is not valid. Format: xxxxx-xxx", (zip) =>
        validateCep(zip)
      ),
    country: yup.string().required(),
  }),
});

const serializedRegisterCustomer = yup.object().shape({
  id: yup.string().required(),
  name: yup.string().required(),
  email: yup.string().email().required(),
  document: yup.string().required(),
  type: yup.string().required(),
  phones: yup.array().required(),
  birthday: yup.string().required(),
  funds: yup.number().required(),
  address: yup.object().shape({
    id: yup.string().required(),
    address1: yup.string().required(),
    address2: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    zip: yup.string().required(),
    country: yup.string().required(),
  }),
});

export { registerCustomer, serializedRegisterCustomer };
