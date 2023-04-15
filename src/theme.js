import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const theme = responsiveFontSizes(createMuiTheme({
  typography: {
    },
    palette: {
    background: {
      default: '#282c34;',
    },

  },
}));


export default theme;
