export const getRoute = route => {
  const BASE_ROUTE = "/user-admin/";
  const fullRoute = BASE_ROUTE ? `${BASE_ROUTE}${route}` : route;
  return fullRoute;
};

const routes = {
  LOGIN: getRoute(`login`),
  SUMMARY: getRoute(`summary`),
  USERS: getRoute(`users/`),
  CREATE_USER: getRoute(`users/create-user`),
  EDIT_USER: getRoute(`users/edit-user`),
  USER_DETAIL: getRoute(`users/user-detail`),
  ANALYTICS_SAFETY_SCORE: getRoute(`analytics/safety-score`),
  ANALYTICS_RISK_SCORE: getRoute(`analytics/risk-score`),
  ANALYTICS_SPEED_SCORE: getRoute(`analytics/speed-score`),
  ANALYTICS_ACTIVE_SCORE: getRoute(`analytics/active-score`),
  JOBS: getRoute(`jobs`),
  CREATE_JOB: getRoute(`jobs/create-job`),
  EDIT_JOB: getRoute(`jobs/edit-job`),
  DEVICES: getRoute(`devices`),
  ADMIN_SETTINGS: getRoute(`admin-settings`),
  MY_PROFILE: getRoute(`my-profile`),
  LOGOUT: getRoute(`logout`),
};

export default routes;
