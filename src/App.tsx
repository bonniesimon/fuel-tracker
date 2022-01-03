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
import { ColorModeSwitcher } from "./ColorModeSwitcher"
// Components
import Home from './views/Home';

export const App = () => (
  <ChakraProvider theme={theme}>
    <Home/> 
  </ChakraProvider>
)
