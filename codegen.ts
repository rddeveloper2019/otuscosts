import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'https://cea3c11a3f62.vps.myjino.ru/graphql',
  generates: {
    './src/shared/api-types.ts': {
      plugins: ['typescript'],
    },
  },
};
export default config;
