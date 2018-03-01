import { Select } from '../src';

describe('Select', () => {
  describe('given string config', () => {
    it('works', () => {
      expect(() => new Select('email')).not.toThrow();
    });

    it('does not have any tables', () => {
      expect(new Select('email')).toHaveProperty('tables', []);
    });

    it('does not have any alias', () => {
      expect(new Select('email')).toHaveProperty('alias', []);
    });

    it('has correct sql', () => {
      expect(new Select('*').sql).toBe('"*"');
      expect(new Select('email').sql).toBe('"email"');
    });
  });

  describe('given object config', () => {
    it('works', () => {
      expect(() => new Select({ name: 'email' })).not.toThrow();
    });

    it('throws error if name is given', () => {
      expect(() => new Select({ from: 'user' })).toThrow();
    });

    it('sets correct tables', () => {
      expect(new Select({ name: 'email', from: 'user' })).toHaveProperty(
        'tables',
        ['user']
      );
      expect(new Select({ name: 'email' })).toHaveProperty('tables', []);
    });

    it('sets correct alias', () => {
      expect(
        new Select({ name: 'email', from: 'user', as: 'userEmail' })
      ).toHaveProperty('alias', ['userEmail']);
      expect(new Select({ name: 'email', from: 'user' })).toHaveProperty(
        'alias',
        []
      );
    });

    it('has correct sql', () => {
      expect(new Select({ name: 'email' }).sql).toBe('"email"');
      expect(new Select({ name: 'email', from: 'user' }).sql).toBe(
        '"user"."email"'
      );
      expect(
        new Select({ name: 'email', from: 'user', as: 'userEmail' }).sql
      ).toBe('"user"."email" AS "userEmail"');
    });
  });

  describe('given array config', () => {
    it('works', () => {
      expect(() => new Select([])).not.toThrow();
    });

    it('throws error if any object does not contain name', () => {
      expect(() => new Select([{ from: 'user' }])).toThrow();
    });

    it('sets correct tables', () => {
      expect(
        new Select([
          { name: 'email', from: 'user' },
          { name: 'title', from: 'article' },
        ])
      ).toHaveProperty('tables', ['user', 'article']);
      expect(new Select([{ name: 'email' }, { name: 'title' }])).toHaveProperty(
        'tables',
        []
      );
    });

    it('sets correct alias', () => {
      expect(
        new Select([
          { name: 'email', from: 'user', as: 'userEmail' },
          { name: 'title', from: 'article', as: 'articleTitle' },
        ])
      ).toHaveProperty('alias', ['userEmail', 'articleTitle']);
      expect(new Select({ name: 'email' })).toHaveProperty('alias', []);
    });

    it('has correct sql', () => {
      expect(
        new Select([
          { name: 'email', from: 'user', as: 'userEmail' },
          { name: 'title', from: 'article', as: 'articleTitle' },
        ]).sql
      ).toBe(
        '"user"."email" AS "userEmail", "article"."title" AS "articleTitle"'
      );
      expect(
        new Select([{ name: 'email', from: 'user', as: 'userEmail' }]).sql
      ).toBe('"user"."email" AS "userEmail"');
      expect(new Select(['email', 'title']).sql).toBe('"email", "title"');
    });
  });

  describe('given all other types of config', () => {
    it('throws error', () => {
      expect(() => new Select(123)).toThrow();
      expect(() => new Select(null)).toThrow();
      expect(() => new Select()).toThrow();
    });
  });
});
