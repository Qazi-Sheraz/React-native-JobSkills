export const getAppliedJobsMenuItems = () => {
  return [
    // {name: 'All', route: 'CDraftedAppliedJob'},
    {name: 'Drafted', route: 'CDraftedAppliedJob'},
    {name: 'Applied', route: 'CAppliedAppliedJob'},
    {name: 'Rejected', route: 'CRejectedAppliedJob'},
    {name: 'Selected', route: 'CSelectedAppliedJob'},
    {name: 'Shortlisted', route: 'CShortlistedAppliedJob'},
    {name: 'Interview Scheduled', route: 'CInterviewScheduledAppliedJob'},
    {name: 'Interview Fixed', route: 'CInterviewFixedAppliedJob'},
    {name: 'Interview Accepted', route: 'CInterviewAcceptedAppliedJob'},
    {name: 'Interview Rescheduled', route: 'CInterviewRescheduledAppliedJob'},
  ];
};
