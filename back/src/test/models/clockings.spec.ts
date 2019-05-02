import * as chai from 'chai';
import * as clockings from '../utils/clocking';
import * as users from '../utils/user';
import truncate from '../utils/truncate';

describe('Clockging model', async () => {
  let clocking = [];
  let user;

  before(async () => {
    await truncate();
    user = await users.save();
  });

  it('Create Clocking', async () => {
    clocking.push(await clockings.save({ userId: user.id }));
  });

  it('Create out Clocking', async () => {
    clocking.push(await clockings.save({ userId: user.id }));
  });

  it('Get Clockings', async () => {
    let _clockings = await clockings.get({ userId: user.id });
    chai.assert.equal(_clockings.length, clocking.length);
  });
});
