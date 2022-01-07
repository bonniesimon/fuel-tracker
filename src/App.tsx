import {
    ChakraProvider,
    Box,
    Text,
    Link,
    VStack,
    Code,
    Grid,
    theme,
} from "@chakra-ui/react";
// Components
import Home from "./views/Home";
// Context
import { CarsContextProvider } from "./context/CarsContext";

export const App = () => (
    <ChakraProvider theme={theme}>
        <CarsContextProvider>
            <Home />
        </CarsContextProvider>
    </ChakraProvider>
);
