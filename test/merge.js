'use strict';

const expect = require('expect');

const conf = require('../tiny-conf');

describe('merge tests', function () {

  before(function () {
    conf.clear();
  });

  it('should merge objects', function () {
    conf.set({
      one: {
        foo: 'bar'
      }
    });
    conf.merge('one.hello', 'world');
    expect(conf.get()).toEqual({
      one: {
        foo: 'bar',
        hello: 'world'
      }
    });
  });

  it('should merge weird objects too', function () {
    conf.set({
      one: {
        foo: {
          bar: {
            baz: ['ok', 'nok']
          }
        }
      },
      two: 42
    });
    conf.merge('one.foo.bar.hello', { world: 42 });
    expect(conf.get()).toEqual({
      one: {
        foo: {
          bar: {
            baz: ['ok', 'nok'],
            hello: {
              world: 42
            }
          }
        }
      },
      two: 42
    });
  });

  it('should merge string', function () {
    conf.set({
      foo: 'bar',
      baz: 42
    });
    conf.merge('foo', 'hello');
    expect(conf.get()).toEqual({
      foo: 'hello',
      baz: 42
    });
  });

  it('should merge array', function () {
    conf.set({
      foo: 'bar',
      baz: 42
    });
    conf.merge('foo', ['hello']);
    expect(conf.get()).toEqual({
      foo: ['hello'],
      baz: 42
    });
  });
});
