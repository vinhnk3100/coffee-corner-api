import { SetMetadata } from '@nestjs/common';

export const IsPostOwner = () => SetMetadata('isPostOwner', true);
