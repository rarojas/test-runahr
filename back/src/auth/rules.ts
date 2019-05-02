import { checkRole } from './acl';

export const onlyAdmin = checkRole('admin');
