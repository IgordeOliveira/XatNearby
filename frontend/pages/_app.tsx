import type { AppProps } from 'next/app'
import { ChakraProvider,extendTheme } from '@chakra-ui/react'

const customTheme = extendTheme({
  colors: {
    grey: {
      50: '#eff4f5',
      100: '#d6dcde',
      200: '#b9c4c9',
      300: '#9badb4',
      400: '#7f96a0',
      500: '#657d86',
      600: '#4f6068',
      700: '#39454a',
      800: '#22292c',
      900: '#0a0e10',
    },
    blue: {
      50: '#e0efff',
      100: '#b5d4fd',
      200: '#88bcfa',
      300: '#5ba8f6',
      400: '#3996f4',
      500: '#2a85da',
      600: '#1d6baa',
      700: '#11507a',
      800: '#02324a',
      900: '#00101c',
    },
    orange: {
      50: '#ffecda',
      100: '#ffd0ae',
      200: '#ffb67d',
      300: '#ff9f4c',
      400: '#ff8b1a',
      500: '#e67a00',
      600: '#b35300',
      700: '#813200',
      800: '#4f1800',
      900: '#1f0400',
    },
    brand: {
      orange: '#e67a00',
      blue: 'blue.800',
      white: '#eff4f5'
    }
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={customTheme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )}

export default MyApp
