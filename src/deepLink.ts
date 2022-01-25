import {SITE_BASE} from '@env';

const config = {
  screens: {
    ChangePasswordScreen: {
      path: 'change-password/:mail/:token',
      parse: {
        token: (token: string) => `${token}`,
        mail: (mail: string) => `${mail}`,
      },
    },
  },
};

const linking = {
  prefixes: ['inkambio://', SITE_BASE],
  config,
};

export default linking;
