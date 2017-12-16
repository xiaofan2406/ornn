import { SelectClause } from 'src/sql';

describe('SelectClause', () => {
  describe('given string config', () => {
    it('works', () => {
      expect(() => new SelectClause('email')).not.toThrow();
    });

    it('does not have any tables', () => {
      expect(new SelectClause('email')).toHaveProperty('tables', []);
    });

    it('does not have any alias', () => {
      expect(new SelectClause('email')).toHaveProperty('alias', []);
    });

    it('has correct sql', () => {
      expect(new SelectClause('*').sql).toBe('"*"');
      expect(new SelectClause('email').sql).toBe('"email"');
    });
  });

  describe('given object config', () => {
    it('works', () => {
      expect(() => new SelectClause({ name: 'email' })).not.toThrow();
    });

    it('throws error if name is given', () => {
      expect(() => new SelectClause({ from: 'user' })).toThrow();
    });

    it('sets correct tables', () => {
      expect(new SelectClause({ name: 'email', from: 'user' })).toHaveProperty(
        'tables',
        ['user']
      );
      expect(new SelectClause({ name: 'email' })).toHaveProperty('tables', []);
    });

    it('sets correct alias', () => {
      expect(
        new SelectClause({ name: 'email', from: 'user', as: 'userEmail' })
      ).toHaveProperty('alias', ['userEmail']);
      expect(new SelectClause({ name: 'email', from: 'user' })).toHaveProperty(
        'alias',
        []
      );
    });

    it('has correct sql', () => {
      expect(new SelectClause({ name: 'email' }).sql).toBe('"email"');
      expect(new SelectClause({ name: 'email', from: 'user' }).sql).toBe(
        '"user"."email"'
      );
      expect(
        new SelectClause({ name: 'email', from: 'user', as: 'userEmail' }).sql
      ).toBe('"user"."email" AS "userEmail"');
    });
  });

  describe('given array config', () => {
    it('works', () => {
      expect(() => new SelectClause([])).not.toThrow();
    });

    it('throws error if any object does not contain name', () => {
      expect(() => new SelectClause([{ from: 'user' }])).toThrow();
    });

    it('sets correct tables', () => {
      expect(
        new SelectClause([
          { name: 'email', from: 'user' },
          { name: 'title', from: 'article' },
        ])
      ).toHaveProperty('tables', ['user', 'article']);
      expect(
        new SelectClause([{ name: 'email' }, { name: 'title' }])
      ).toHaveProperty('tables', []);
    });

    it('sets correct alias', () => {
      expect(
        new SelectClause([
          { name: 'email', from: 'user', as: 'userEmail' },
          { name: 'title', from: 'article', as: 'articleTitle' },
        ])
      ).toHaveProperty('alias', ['userEmail', 'articleTitle']);
      expect(new SelectClause({ name: 'email' })).toHaveProperty('alias', []);
    });

    it('has correct sql', () => {
      expect(
        new SelectClause([
          { name: 'email', from: 'user', as: 'userEmail' },
          { name: 'title', from: 'article', as: 'articleTitle' },
        ]).sql
      ).toBe(
        '"user"."email" AS "userEmail", "article"."title" AS "articleTitle"'
      );
      expect(
        new SelectClause([{ name: 'email', from: 'user', as: 'userEmail' }]).sql
      ).toBe('"user"."email" AS "userEmail"');
      expect(new SelectClause(['email', 'title']).sql).toBe('"email", "title"');
    });
  });

  describe('given all other types of config', () => {
    it('throws error', () => {
      expect(() => new SelectClause(123)).toThrow();
      expect(() => new SelectClause(null)).toThrow();
      expect(() => new SelectClause()).toThrow();
    });
  });
});
