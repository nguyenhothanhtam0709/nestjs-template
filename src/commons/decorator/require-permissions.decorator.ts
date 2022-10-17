import { METADATA_KEY } from '@commons/enums/metadata';
import { SetMetadata } from '@nestjs/common';

export const RequirePermissions = (...permissions: string[]) =>
  SetMetadata(METADATA_KEY.PERMISSIONS, permissions);
