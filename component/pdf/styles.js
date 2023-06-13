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
    marginTop: '80px',
    width: '80px',
    textAlign: 'center'
  },

  verticalText3: {
    transform: "rotate(-90deg)",
    transformOrigin: "left top 0",
    float: "left",
    marginTop: '95px',
    width: '95px',
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
    marginTop: '44.5px',
    width: '44.5px',
    textAlign: 'center',
    paddingTop:'2px'
  },
  vTextNP2: {
    transform: "rotate(-90deg)",
    transformOrigin: "left top 0",
    float: "left",
    marginTop: '37px',
    width: '49px',
    height: '14px',
    textAlign: 'center'
  },
  vTextNP22: {
    transform: "rotate(-90deg)",
    transformOrigin: "left top 0",
    float: "left",
    marginTop: '33px',
    width: '49px',
    height: '14px',
    textAlign: 'center'
  },
  vTextNP3: {
    transform: "rotate(-90deg)",
    transformOrigin: "left top 0",
    float: "left",
    width: '47px',
    height: '18.2px',
    textAlign: 'center',
    paddingTop:'1px'
  },
  vTextNP4: {
    transform: "rotate(-90deg)",
    transformOrigin: "left top 0",
    float: "left",
    width: '47px',
    height: '18.2px',
    textAlign: 'center',
    paddingTop:'1px'
  },
  hText: {
    borderRight: 1,
    borderBottom: 1,
    width: '84.8px',
    textAlign: 'center'
  },
  hText2: {
    borderRight: 1,
    borderBottom: 1,
    width: '52px',
    textAlign: 'center'
  }
});

export default styles