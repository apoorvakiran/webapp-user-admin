export const SideMenuStyle = {
  fontSize: "14px",
  fontWeight: 500,
  backgroundColor: "#fcfcfc",
  marginTop: "20px",
  fontFamily: 'Montserrat',
  color: "#C54B30",
}

export const SideMenuItemStyle = {
  fontSize: "14px"
}

export const AvatarIconStyle = { backgroundColor: "#fcfcfc" };

export const LogoComponentStyle = { margin: "2em 0 0 2.75em" }
export const logoStyle = {};
const LayoutComponentStyles = {
  fixedSider: {
    overflow: "auto",
    height: "100vh",
    position: "fixed",
    left: 0,
  },
  actionButtons: {
    paddingRight: 20,
    marginTop: 10,
  },
  parentLayout: { minHeight: "100vh" },
  mainLayout: {
    height: "100vh",
    width:"100%"
  },
  fixedPageHeader: {
    zIndex: 100,
    width: "inherit",
    backgroundColor: "#fcfcfc",
    height: "50px",
  },
  content: {
    width: "inherit",
    background: "#FFFFFF",
    boxShadow: "10px 20px 30px rgba(0, 0, 0, 0.1)",
    borderRadius: "15px"
  },
  noData: { margin: "20px" }
};

export default LayoutComponentStyles;
