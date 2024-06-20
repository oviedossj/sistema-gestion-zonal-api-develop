import { createError } from '../src/config/handler/handler'; 

test('createError with valid key', async () => {
  const error = await createError('general.UNAUTHORIZED.invalid_access_key', 'es');
  expect(error).toEqual({
    key: 'general.UNAUTHORIZED.invalid_access_key',
    code: 'INVALID_ACCESS_KEY',
    message: 'Se proporcionó una clave de acceso API no válida.',
    status: 401,
  });
});

test('createError with invalid key', async () => {
  const error = await createError('nonexistent.key', 'es');
  expect(error).toEqual({
    key: 'internal_error',
    code: 'INTERNAL_SERVER_ERR',
    message: 'Ocurrió un error interno.',
    status: 500,
  });
});
