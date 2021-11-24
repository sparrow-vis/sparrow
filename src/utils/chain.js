export function chain(createFoo, defaultOptions) {
  let foo = createFoo(defaultOptions);
  const options = { ...defaultOptions };
  for (const key of Object.keys(options)) {
    foo[key] = (...params) => {
      if (params.length > 0) {
        const value = params.length === 1 ? params[0] : params;
        options[key] = value;
        const newFoo = createFoo(options);
        Object.assign(newFoo, foo);
        foo = newFoo;
        return newFoo;
      }
      return options[key];
    };
  }
  return () => foo;
}
