import * as yup from 'yup';

import { UserCreationRequest } from '../../../apis/identity/requests';

export const userCreationSchema: yup.ObjectSchema<UserCreationRequest> =
  yup.object({
    account: yup.string().required(),
    idGroupUser: yup.string().required(),
    idStaff: yup.number().required(),
    password: yup.string().required(),
    confirmationPassword: yup
      .string()
      .required()
      .oneOf([yup.ref('password')], 'Mật khẩu phải giống nhau'),
  });
