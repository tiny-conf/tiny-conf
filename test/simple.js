'use strict';

const expect = require('expect');

const conf = require('../tiny-conf');

describe('simple tests', function () {

  before(function () {
    conf.clear();
  });

  it('should set string value', function () {
    conf.set('foo', 'bar');
    expect(conf.get('foo')).toEqual('bar');
  });

  it('should set number value', function () {
    conf.set('foo', 42);
    expect(conf.get('foo')).toEqual(42);
  });

  it('should set boolean value', function () {
    conf.set('foo', false);
    expect(conf.get('foo')).toEqual(false);
  });

  it('should set array value', function () {
    conf.set('foo', ['hello', 42]);
    expect(conf.get('foo')).toEqual(['hello', 42]);
  });

  it('should set object value', function () {
    conf.set('foo', { bar: 'baz' });
    expect(conf.get('foo')).toEqual({ bar: 'baz' });
  });
});
