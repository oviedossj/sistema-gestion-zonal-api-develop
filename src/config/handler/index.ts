import YAML from 'yamljs';
import config from '@src/config/env/env';
import { errorHandler } from './handler';

const errors = YAML.load(config.DIR_ERRORS);

export { errors, errorHandler };
