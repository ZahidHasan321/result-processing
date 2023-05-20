const { StyleSheet } = require("@react-pdf/renderer");

const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      marginTop: '48px',
      marginBottom: '10px',
      marginLeft: '30px',
      marginRight: '7px'

    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    },
    Text:{
        fontSize: 5
    }
  });

  export default styles