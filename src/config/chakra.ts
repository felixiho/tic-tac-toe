import { extendTheme } from '@chakra-ui/react' 



const theme = extendTheme({ 
  fonts: {
    heading: `pacifico, sans-serif`,
    body: `'Love Ya Like A Sister', sans-serif`,
  },
  colors: {
    primary: {
      100: 'linear-gradient(125.01deg, #FFCC00 11.66%, #FF6D00 96.09%)',
      200: '#FFCC00',
      300: '#FF6D00'
    }, 
  }, 
})

export default theme