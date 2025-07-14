export const theme = {
  colors: {
    primary: {
      main: '#1976d2',
      light: '#63a4ff',
      dark: '#004ba0',
      contrastText: '#fff',
    },
    secondary: {
      main: '#dc004e',
      light: '#ff5c8d',
      dark: '#9a0036',
      contrastText: '#fff',
    },
  },
  spacing: (factor: number) => `${0.25 * factor}rem`,
};

export type Theme = typeof theme;
