import routes from "./URLs";

export const MENU_KEYS = {
  LOGIN: "login",
  SUMMARY: "summary",
  USERS: "users",
  ANALYTICS: "analytics",
  JOBS: "jobs",
  DEVICES: "devices",
  ADMIN_SETTINGS: "admin-settings",
  MY_PROFILE: "my-profile",
  LOGOUT: "logout",
};
// export const sideBarNavigator = [
//   {
//     name: "Summary",
//     key: MENU_KEYS.SUMMARY,
//     url: routes.SUMMARY,
//     icon: "CaretRightOutlined",
//   },
//   {
//     name: "Users",
//     key: MENU_KEYS.USERS,
//     url: routes.USERS,
//     icon: "CaretRightOutlined",
//   },
//   {
//     name: "Analytics",
//     key: MENU_KEYS.ANALYTICS,
//     url: routes.ANALYTICS_SAFETY_SCORE,
//     icon: "CaretRightOutlined",
//   },
//   {
//     name: "Jobs",
//     key: MENU_KEYS.JOBS,
//     url: routes.JOBS,
//     icon: "CaretRightOutlined",
//   },
//   {
//     name: "Devices",
//     key: MENU_KEYS.DEVICES,
//     url: routes.DEVICES,
//     icon: "CaretRightOutlined",
//   },
//   // {
//   //   name: "Admin Settings",
//   //   key: MENU_KEYS.ADMIN_SETTINGS,
//   //   url: routes.ADMIN_SETTINGS,
//   //   icon: "CaretRightOutlined",
//   // },
//   // {
//   //   name: "My Profile",
//   //   key: MENU_KEYS.MY_PROFILE,
//   //   url: routes.MY_PROFILE,
//   //   icon: "CaretRightOutlined",
//   // },
//   {
//     name: "Logout",
//     key: MENU_KEYS.LOGOUT,
//     url: routes.LOGOUT,
//     icon: "CaretRightOutlined",
//   },
// ];

export const adminSideBarNavigator = [
  {
    name: "Summary",
    key: MENU_KEYS.SUMMARY,
    url: routes.SUMMARY,
    icon: "CaretRightOutlined",
  },
  {
    name: "Users",
    key: MENU_KEYS.USERS,
    url: routes.USERS,
    icon: "CaretRightOutlined",
  },
  {
    name: "Analytics",
    key: MENU_KEYS.ANALYTICS,
    url: routes.ANALYTICS_SAFETY_SCORE,
    icon: "CaretRightOutlined",
  },
  {
    name: "Jobs",
    key: MENU_KEYS.JOBS,
    url: routes.JOBS,
    icon: "CaretRightOutlined",
  },
  {
    name: "Devices",
    key: MENU_KEYS.DEVICES,
    url: routes.DEVICES,
    icon: "CaretRightOutlined",
  },
  // {
  //   name: "Admin Settings",
  //   key: MENU_KEYS.ADMIN_SETTINGS,
  //   url: routes.ADMIN_SETTINGS,
  //   icon: "CaretRightOutlined",
  // },
  // {
  //   name: "My Profile",
  //   key: MENU_KEYS.MY_PROFILE,
  //   url: routes.MY_PROFILE,
  //   icon: "CaretRightOutlined",
  // },
  {
    name: "Logout",
    key: MENU_KEYS.LOGOUT,
    url: routes.LOGOUT,
    icon: "CaretRightOutlined",
  },
];

export const userSideBarNavigator = [
  {
    name: "Summary",
    key: MENU_KEYS.USERS,
    url: routes.USER_DETAIL,
    icon: "CaretRightOutlined",
  },
  {
    name: "Logout",
    key: MENU_KEYS.LOGOUT,
    url: routes.LOGOUT,
    icon: "CaretRightOutlined",
  },
];