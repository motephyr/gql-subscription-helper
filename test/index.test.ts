import GqlSubscriptionHelper from '../src/index';

test('init', async () => {
  const prev = { candidates: [{ id: 1, data: 'aa' }] }
  let obj = { mutation: "CREATED", node: { id: 2, data: 'bb' } }
  let result = GqlSubscriptionHelper.updateQuery(prev, obj)
  expect(result).toEqual({ candidates: [{ id: 2, data: 'bb' }, { id: 1, data: 'aa' }] });

  obj = { mutation: "UPDATED", node: { id: 1, data: 'bb' } }
  result = GqlSubscriptionHelper.updateQuery(prev, obj)
  expect(result).toEqual({ candidates: [{ id: 1, data: 'bb' }] });

  obj = { mutation: "DELETED", node: { id: 1, data: ''} }
  result = GqlSubscriptionHelper.updateQuery(prev, obj)
  expect(result).toEqual({ candidates: [] });
});

