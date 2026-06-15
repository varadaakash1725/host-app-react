export const mfeConfig = {
  dashboard: {
    url: 'http://localhost:3001/remoteEntry.js',
    scope: 'dashboard_mfe',
    module: './App',
  },

  accounts: {
    url: 'http://localhost:3002/remoteEntry.js',
    scope: 'accounts_mfe',
    module: './App',
  },

  payments: {
    url: 'http://localhost:3003/remoteEntry.js',
    scope: 'payments_mfe',
    module: './App',
  },
};