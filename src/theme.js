import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
// import { red } from '@mui/material/colors'
const APP_BAR_HEIGHT = '58px'
const APP_BOARD_HEIGHT = '60px'
const APP_CONTENT_HEIGHT = `calc(100vh - ${APP_BAR_HEIGHT} - ${APP_BOARD_HEIGHT})`
const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '50px'
// Create a theme instance.
const theme = extendTheme({
  trello: {
    appBarHeight: APP_BAR_HEIGHT,
    boardBarHeight: APP_BOARD_HEIGHT,
    boardContentHeight: APP_CONTENT_HEIGHT,
    columnHeaderHeight: COLUMN_HEADER_HEIGHT,
    columnFooterHeight: COLUMN_FOOTER_HEIGHT
  },
  colorSchemes: {
    // light: {
    //   palette: {
    //     primary: teal,
    //     secondary: deepOrange
    //   }
    // },
    // dark: {
    //   palette: {
    //     primary: teal,
    //     secondary: orange
    //   }
    // }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '8px'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#dcdde7',
            borderRadius: '8px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'white',
            borderRadius: '8px'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderWidth: '0.5px',
          '&:hover': {
            borderWidth: '0.5px'
          }
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          //color: theme.palette.primary.main,
          fontSize: '0.875rem'
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          //color: theme.palette.primary.main,
          '&.MuiTypography-body1': {
            fontSize: '0.875rem'
          }
        }
      }
    },
    // MuiOutlinedInput: {
    //   styleOverrides: {
    //     root: ({ theme }) => {
    //       return {
    //         color: theme.palette.primary.main,
    //         fontSize: '0.875rem'
    //       }
    //     }
    //   }
    // }
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          //color: theme.palette.primary.main,
          fontSize: '0.875rem',
          // '.MuiOutlinedInput-notchedOutline': {
          //   borderColor: theme.palette.primary.light
          // },
          // '&:hover': {
          //   '.MuiOutlinedInput-notchedOutline': {
          //     borderColor: theme.palette.primary.light
          //   }
          //},
          '& fieldset': {
            borderWidth: '0.5px !important'
          },
          '&:hover fieldset': {
            borderWidth: '1px !important'
          },
          '&.Mui-focused fieldset': {
            borderWidth: '1px !important'
          }
        }
      }
    }
  }
  // ...other properties
})

export default theme