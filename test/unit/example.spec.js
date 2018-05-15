'use strict'

const { test } = use('Test/Suite')('Example')

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
