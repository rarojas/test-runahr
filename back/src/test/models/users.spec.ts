import { save, update } from '../utils/user';
import truncate from '../utils/truncate';

describe('User model', () => {
  let user;
  before(async () => {
    await truncate();
  });
  it('Create user', async () => {
    user = await save();
  });

  it('Edit user', async () => {
    user = await update(user);
  });
});
