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

theme.overrideStyles = () => ({
  code: {
    lineHeight: '1.2rem',
  },
  pre: {
    background: 'hsla(0,0%,0%,0.04)',
    borderRadius: '3px',
    lineHeight: '1rem',
    overflow: 'auto',
    padding: '1rem',
  },
});

const typography = new Typography(theme);

export default typography;
