import { test } from '@japa/runner'

test.group('Near users', () => {
  test('GET near-users returns a list of near users', async ({ client , assert }) => {
    const response = await client.get('/near-users')
    response.assertStatus(200)
    assert.isArray(response.body())

  })
})
