'use strict'

const { test, before, beforeEach, after, afterEach } = use('Test/Suite')('Example')

test('make sure 2 + 2 is 4', async ({ assert }) => {
  assert.equal(2 + 2, 4)
})

test('demo test: equal', async ({ assert }) => {
  const data = 'hello'
  assert.equal(data, 'hello', 'equal test')
})

test('demo test: notEqual', async ({ assert }) => {
  const data = 'hello'
  assert.notEqual(data, '您好', 'notEqual test')
})

test('demo test: isAbove', async ({ assert }) => {
  const data = 6
  assert.isAbove(data, 5, 'isAbove test')
})

before(async () => {
  // console.log('before test')
})

beforeEach(async () => {
  // console.log('beforeEach test')
})

after(async () => {
  // console.log('after test')
})

afterEach(async () => {
  // console.log('afterEach test')
})
