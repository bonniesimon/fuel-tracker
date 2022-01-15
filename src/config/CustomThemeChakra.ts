// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react"

// 2. Call `extendTheme` and pass your custom values
const CustomTheme = extendTheme({
  colors: {
    brand: {
		// Palette taken from https://www.happyhues.co/palettes/12
      "background": "#232946",
      "headline": "#fffffe",
	  "paragraph": "#b8c1ec",
	  "secondary" : "#eebbc3",
    },
  },
})

export default CustomTheme;