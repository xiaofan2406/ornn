import { Where } from '../src';

describe('Where', () => {
  describe('given single clause config', () => {
    it('works', () => {
      expect(
        () =>
          new Where({
            name: 'email',
            operator: '=',
            value: 'hello@ornn.com',
          })
      ).not.toThrow();
    });

    it('sets correct tables', () => {
      expect(
        new Where({
          name: 'email',
          operator: '=',
          value: 'hello@ornn.com',
        })
      ).toHaveProperty('tables', []);

      expect(
        new Where({
          name: 'email',
          operator: '=',
          value: 'hello@ornn.com',
          from: 'user',
        })
      ).toHaveProperty('tables', ['user']);
    });

    it('has correct sql', () => {
      expect(
        new Where({
          name: 'email',
          operator: '=',
          value: 'hello@ornn.com',
          from: 'user',
        }).sql
      ).toBe('"user"."email" = \'hello@ornn.com\'');
      expect(
        new Where({
          name: 'email',
          operator: '=',
          value: 'hello@ornn.com',
        }).sql
      ).toBe('"email" = \'hello@ornn.com\'');
    });
  });

  describe('given complex clause config', () => {
    it('works', () => {
      expect(
        () =>
          new Where({
            connector: 'or',
            clauses: [
              {
                name: 'email',
                operator: '=',
                value: 'hello@ornn.com',
              },
            ],
          })
      ).not.toThrow();
    });

    it('sets correct tables', () => {
      expect(
        new Where({
          connector: 'or',
          clauses: [
            {
              name: 'email',
              operator: '=',
              value: 'hello@ornn.com',
              from: 'user',
            },
            {
              name: 'title',
              operator: '=',
              value: 'tutorial',
              from: 'article',
            },
          ],
        })
      ).toHaveProperty('tables', ['user', 'article']);

      expect(
        new Where({
          connector: 'or',
          clauses: [
            {
              name: 'email',
              operator: '=',
              value: 'hello@ornn.com',
            },
            {
              name: 'title',
              operator: '=',
              value: 'tutorial',
            },
          ],
        })
      ).toHaveProperty('tables', []);
    });

    it('has correct sql', () => {
      expect(
        new Where({
          connector: 'or',
          clauses: [
            {
              name: 'email',
              operator: '=',
              value: 'hello@ornn.com',
              from: 'user',
            },
            {
              name: 'title',
              operator: '=',
              value: 'tutorial',
              from: 'article',
            },
          ],
        }).sql
      ).toBe(
        '("user"."email" = \'hello@ornn.com\' OR "article"."title" = \'tutorial\')'
      );
      expect(
        new Where({
          connector: 'or',
          clauses: [
            {
              name: 'email',
              operator: '=',
              value: 'hello@ornn.com',
              from: 'user',
            },
            {
              connector: 'AND',
              clauses: [
                {
                  name: 'shares',
                  operator: '<',
                  value: 100,
                  from: 'article',
                },
                {
                  name: 'likes',
                  operator: '>',
                  value: 10,
                  from: 'article',
                },
              ],
            },
          ],
        }).sql
      ).toBe(
        '("user"."email" = \'hello@ornn.com\' OR ("article"."shares" < \'100\' AND "article"."likes" > \'10\'))'
      );
    });
  });

  describe('given config that is not an object', () => {
    it('throws error', () => {
      expect(() => new Where([])).toThrow();
      expect(() => new Where(123)).toThrow();
      expect(() => new Where(null)).toThrow();
      expect(() => new Where('')).toThrow();
      expect(() => new Where()).toThrow();
    });
  });
});
