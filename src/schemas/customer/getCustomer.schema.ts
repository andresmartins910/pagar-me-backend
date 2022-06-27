import * as yup from "yup";

const serializedGetCustomer = yup.object().shape({
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
  wallets: yup.array().required(),
});

export { serializedGetCustomer };
