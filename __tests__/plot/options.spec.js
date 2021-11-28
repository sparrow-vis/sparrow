import {
  defineOptions, useOptions, item, array, object,
} from '../../src/plot/options';

describe('options', () => {
  test('options', () => {
    const a = defineOptions({
      array: array(),
      obj: object(),
      number: item(),
    });

    const b = defineOptions({ obj: object({ d: 'd' }), array: array([0, 1]) });

    a
      .array(1, 2, 3)
      .obj('a', 'a')
      .obj('b', b.obj('c', 'c'))
      .number(2);

    expect(useOptions(a)).toEqual({
      array: [1, 2, 3],
      obj: {
        a: 'a',
        b: {
          obj: { c: 'c', d: 'd' },
          array: [0, 1],
        },
      },
      number: 2,
    });
  });
});
