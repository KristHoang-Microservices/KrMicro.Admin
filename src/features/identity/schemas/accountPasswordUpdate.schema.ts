import * as yup from 'yup';

import { AccountPasswordUpdateRequest } from '../../../apis/identity/requests';

export const accountPasswordUpdateSchema: yup.ObjectSchema<AccountPasswordUpdateRequest> =
  yup.object({
    passwordOld: yup.string().required(),
    passwordNew: yup.string().required(),
    confirmationPassword: yup
      .string()
      .required()
      .oneOf([yup.ref('passwordNew')], 'Mật khẩu phải giống nhau'),
  });
