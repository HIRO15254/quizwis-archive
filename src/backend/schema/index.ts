import { builder } from './builder';

import './mutation';
import './query';
import './object';
import './enum';

builder.queryType();
builder.mutationType();

export const schema = builder.toSchema();
