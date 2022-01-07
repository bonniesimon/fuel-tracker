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
import DefaultLayout from "./components/Layout/DefaultLayout";
import Home from "./views/Home";
// Context
import { CarsContextProvider } from "./context/CarsContext";

export const App = () => (
    <ChakraProvider theme={theme}>
        <CarsContextProvider>
            <DefaultLayout>
                <Home />
            </DefaultLayout>
        </CarsContextProvider>
    </ChakraProvider>
);
