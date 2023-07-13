import { UserRole } from '@prisma/client';

import { builder } from '../builder';

export const UserRoleEnum = builder.enumType(UserRole, {
  name: 'UserRole',
});
