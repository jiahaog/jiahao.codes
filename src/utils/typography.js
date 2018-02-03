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

theme.overrideStyles = ({ adjustFontSizeTo, rhythm }, options, styles) => ({
  pre: {
    color: 'green',
    background: 'hsla(0,0%,0%,0.04)',
    'border-radius': '3px',
    overflow: 'auto',
    padding: '1rem',
  },
});

const typography = new Typography(theme);

export default typography;
