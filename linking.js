const config = {
   
  screens: {
    CHomeStack: {
      screens: {
        CJobDetails: {
          path: '/:company_name/job-details/:id/:job_title',
        },
        CSelectedCompany: {
          path: 'chome/:company_name',
        },
      },
    },


    EHomeStack: {
      screens: {
        JobDetails: {
          path: ':company_name/job-details/:id/:job_title',
  
        },
      },
    },
  },
  
};

export const linking = {
  // prefixes: ['jobskills://'],
  prefixes: [ 'https://dev.jobskills.digital'],
  config,
  
};
