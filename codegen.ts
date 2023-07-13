
import { printSchema } from 'graphql';

import { schema } from "./src/backend/schema";

import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  watch: true,
  schema: printSchema(schema),
  documents: ['src/**/*.gql'],
  generates: {
    './src/gql/index.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
    },
  },
};

export default config;
