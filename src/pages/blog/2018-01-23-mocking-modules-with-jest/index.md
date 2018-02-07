---
title: Mocking Modules with Jest
date: 2018-01-23
path: /blog/mocking-modules-with-jest/
excerpt: How to mock modules using Jest <em>à la</em> RSpec
---

When I was working on building full stack web applications at [Grab](https://www.grab.com), I noticed that even though mocking function calls in Ruby on Rails is rather idiomatic, it is less so for the Javascript ecosystem. Sometimes, we might have some utility functions which makes a external HTTP call which we want to mock out in our tests, but how do we do it in Javascript?

## Ruby Example

Let’s look at what we want to do in Ruby first before “translating” it to Javascript.

Ruby on Rails applications typically use [RSpec](https://github.com/rspec/rspec) as a testing framework where we can easily mock out code.

```ruby
# http_client.rb
module HTTPClient
  def make_http_call
    # makes a http call, returns a number
  end
end
```

```ruby
# module.rb
def add_one_to_http_call
  res = make_http_call
  res + 1
end
```

```ruby
# module_spec.rb
describe 'add_one_to_http_call' do
  before do
    expect(HTTPClient).to_recieve(:make_http_call).and_return(1)
  end

  it 'adds one to the response' do
    res = add_one_to_http_call
    expect(res).to eq(2)
  end
end
```

## Jest

However, doing the same in Javascript seems to be less obvious, and I had to take some time to figure this out.

Let’s try to write the same code in Javascript. We will use [Jest](https://facebook.github.io/jest/) as the test framework for our tests.

```javascript
// dependency.js
// makeHttpCall is an example function which should not be called, and should be mocked out in
// our tests
export const makeHttpCall = () => {};

export default makeHttpCall;
```

We will illustrate this example with both default and named exports.

### Default Exports

```javascript
// module.js
import makeHttpCall from 'dependency';

const addOneToHttpCall = () => makeHttpCall() + 1;

export default addOneToHttpCall;
```

```javascript
// module.test.js
import addOneToHttpCall from './module';
import makeHttpCall from './dependency';

jest.mock('./dependency');

test('mock is called', () => {
  addOneToHttpCall();
  expect(makeHttpCall).toHaveBeenCalledTimes(1);
});
```

By calling [`jest.mock()`](https://facebook.github.io/jest/docs/en/jest-object.html#jestmockmodulename-factory-options), we can setup what is exported as a [mock function](https://facebook.github.io/jest/docs/en/mock-function-api.html).

### Named Exports

Similarly, this can be done with named exports.

```javascript
// module.js
import { makeHttpCall } from './../dependency';

const addOneToHttpCall = () => makeHttpCall() + 1;

export default addOneToHttpCall;
```

```javascript
// module.test.js
import addOneToHttpCall from './module';
import { makeHttpCall } from './dependency';

jest.mock('./dependency');

test('mock is called', () => {
  addOneToHttpCall();
  expect(makeHttpCall).toHaveBeenCalledTimes(1);
});
```

Note that calling `jest.mock(‘./dependency’)` will replace all exported functions of `dependency.js` with mock functions.

What if there is another arbitrary named export in `dependency.js`, a `split()` function that we do not want to mock?

```javascript
// dependency.js
export const makeHttpCall = () => {};

export const split = (inp, delimiter) => inp.split(delimiter);

export default makeHttpCall;
```

Simply call `jest.mock` with a second argument, using [`require.requireActual`](https://facebook.github.io/jest/docs/en/api.html#requirerequireactualmodulename) to retain the value of the original function. Props to [Paradite](https://paradite.com/) for teaching me how to do this:

```javascript
// module.test.js
import addOneToHttpCall from './index';
import { makeHttpCall, split } from './../dependency';

jest.mock('./../dependency', () => ({
  makeHttpCall: jest.fn(),
  split: require.requireActual('./../dependency').split,
}));

test('only mock the value of makeHttpCall()', () => {
  makeHttpCall.mockReturnValueOnce(1);
  const result = addOneToHttpCall();
  expect(result).toEqual(2);
});

test('split() still works as intended', () => {
  const result = split('a,b,c', ',');
  expect(result).toEqual(['a', 'b', 'c']);
});
```

## Conclusion

Hopefully this short blog post illustrates how mocking in Jest can be just as easy as how we do it in RSpec. Let me know at [@jiahaog](https://twitter.com/jiahaog) if you have any feedback regarding this!

Accompanying source code can be found [here](https://github.com/jiahaog/jest-mock-example)!
