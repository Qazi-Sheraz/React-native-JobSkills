const config = {
  screens: {
    CHomeStack: {
      screens: {
        CHome: 'home',
        CNotification: {
          path: 'notification/:id',
          parse: {id: Number},
        },
      },
    },
  },
};

export const linking = {
  prefixes: ['jobskills://'],
  config,
};
