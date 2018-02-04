import Typography from 'typography';
import theme from 'typography-theme-fairy-gates';

theme.bodyFontFamily = ['Source Sans Pro', 'sans-serif'];
theme.googleFonts = [
  {
    name: 'Work Sans',
    styles: ['600'],
  },
  {
    name: 'Source Sans Pro',
    styles: ['400', '400i', '600'],
  },
];

const typography = new Typography(theme);

export default typography;
