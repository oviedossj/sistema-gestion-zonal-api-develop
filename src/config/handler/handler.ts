import { Request, Response, NextFunction } from 'express';
import YAML from 'yamljs';
import axios from 'axios';
// import logger from '@src/utils/logger';
import config from '@src/config/env/env';
import { ErrorDetail } from '@src/interface';
import logger from '@src/utils/logger';

const errors = YAML.load(config.DIR_ERRORS);
export async function createError(errorKey: string, lang: 'en' | 'es' = 'en'): Promise<ErrorDetail> {
  try {
    const keys = errorKey.split('.');
    let errorType: any = errors;

    errorType = keys.reduce((acc, key) => {
      if (!acc[key]) {
        throw new Error('Error key not found');
      }
      return acc[key];
    }, errorType);

    if (typeof errorType !== 'object' || !errorType.message) {
      throw new Error('Invalid error format');
    }

    return {
      key: errorType.key,
      code: errorType.code,
      message: errorType.message[lang] || errorType.message.en,
      status: errorType.status,
    };
  } catch (error) {
    logger.error(`Error in createError: ${error}`);
    return {
      key: 'internal_error',
      code: 'INTERNAL_SERVER_ERR',
      message: lang === 'es' ? 'Ocurrió un error interno.' : 'An internal error occurred.',
      status: 500,
    };
  }
}

export async function errorHandler(err: unknown, req: Request, res: Response, next: NextFunction) {
  if (!err) return next();

  const lang = req.headers['accept-language']?.startsWith('es') ? 'es' : 'en';
  let errorDetail: ErrorDetail;

  if (err instanceof Error) {
    errorDetail = await createError(err.message, lang);
  } else if (axios.isAxiosError(err)) {
    errorDetail = await createError('http_client.get_error', lang);
  } else {
    errorDetail = {
      key: 'unknown_error',
      code: 'UNKNOWN_ERROR',
      message: lang === 'es' ? 'Ocurrió un error desconocido.' : 'An unknown error occurred.',
      status: 500,
    };
  }

  // Log del detalle del error
  console.error(`Error in errorHandler: ${errorDetail.message}`);

  res.status(errorDetail.status).json({
    error: {
      key: errorDetail.key,
      code: errorDetail.code,
      message: errorDetail.message,
    },
  });
}
