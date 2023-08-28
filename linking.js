const config = {

  screens: {
    HomeStack: {
      screens: {
        CJobDetails: {
          path: '/:companyNames/job-details/:id/:job_title',
        }, 
        CSelectedCompany: {
          path: '/:companyName',
        },
      },
    },
    },

};

export const linking = {
  // prefixes: ['jobskills://'],
  prefixes: ['https://dev.jobskills.digital'],
  config,

};
