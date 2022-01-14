import React from "react";
import { Flex } from "@chakra-ui/react";
import Header from "../Navbar";
// import Footer from "../Footer";

export default function DefaultLayout(props: any) {
  return (
    <Flex
      direction="column"
      align="center"
	  w="100%"
      m="0 auto"
	  bgColor="gray.50"
	  minHeight="100vh"
	  color="paragraph"
      {...props}
    >
      <Header />
	{props.children}
    {/* <Footer/> */}
    </Flex>
  );
}