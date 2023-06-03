const { StyleSheet } = require("@react-pdf/renderer");

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    marginTop: '48px',
    marginBottom: '10px',
    marginRight: '7px'

  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  verticalText: {
    transform: "rotate(-90deg)",
    transformOrigin: "left top 0",
    float: "left",
    marginTop: '69px',
    paddingLeft: '3px',
    paddingRight: '3px',
    width: '70px',
    textAlign: 'center'
  },
  verticalText2: {
    transform: "rotate(-90deg)",
    transformOrigin: "left top 0",
    float: "left",
    marginTop: '58px',
    paddingLeft: '3px',
    paddingRight: '3px',
    width: '70px',
    textAlign: 'center'
  },

  vTextNP: {
    transform: "rotate(-90deg)",
    transformOrigin: "left top 0",
    float: "left",
    marginTop: '43.2px',
    width: '43.3px',
    textAlign: 'center'
  },
  vTextNP2: {
    transform: "rotate(-90deg)",
    transformOrigin: "left top 0",
    float: "left",
    marginTop: '24px',
    width: '35px',
    height: '10px',
    textAlign: 'center'
  },
  vTextNP3: {
    transform: "rotate(-90deg)",
    transformOrigin: "left top 0",
    float: "left",
    width: '35px',
    height: '11px',
    textAlign: 'center',
    paddingTop:'1px'
  },
  vTextNP4: {
    transform: "rotate(-90deg)",
    transformOrigin: "left top 0",
    float: "left",
    width: '34px',
    height: '11px',
    textAlign: 'center',
    paddingTop:'1px'
  },
  hText: {
    borderRight: 1,
    borderBottom: 1,
    width: '52.2px',
    textAlign: 'center'
  },
  hText2: {
    borderRight: 1,
    borderBottom: 1,
    width: '31.6px',
    textAlign: 'center'
  }
});

export default styles