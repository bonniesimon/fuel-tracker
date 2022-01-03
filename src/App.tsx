import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from "@chakra-ui/react"
// Components
import Home from './views/Home';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Home/> 
  </ChakraProvider>
)
