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
import { Routes, Route } from "react-router-dom";
import CustomTheme from "./config/CustomThemeChakra";
// Components
import DefaultLayout from "./components/Layout/DefaultLayout";
import Home from "./views/Home";
import Car from "./views/Car";
// Context
import { CarsContextProvider } from "./context/CarsContext";

export const App = () => (
    <ChakraProvider theme={CustomTheme}>
        <CarsContextProvider>
            <DefaultLayout>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="car/:carid" element={<Car/>} />
                </Routes>
            </DefaultLayout>
        </CarsContextProvider>
    </ChakraProvider>
);
