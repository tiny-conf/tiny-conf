'use strict';

const expect = require('expect');

const conf = require('../tiny-conf');

describe('nested tests', function () {

	before(function () {
		conf.clear();
	});

	it('should set string value to nested path', function () {
		const val = 'baz';
		conf.set('foo.bar', 'baz');
		expect(conf.get('foo.bar')).toEqual(val);
	});

	it('should return object value when value added in nested path', function () {
		conf.set('foo.bar', 42);
		expect(conf.get('foo')).toEqual({ bar: 42 });
	});

	it('should work with huge nested path', function () {
		conf.set({
			one: {
				two: {
					three: {
						four: {
							five: {
								six: {
									seven: {
										eight: {
											nine: 42
										}
									}
								}
							}
						}
					}
				}
			}
		});
		expect(conf.get('one.two.three.four.five.six.seven.eight.nine')).toEqual(42);
	});
});
