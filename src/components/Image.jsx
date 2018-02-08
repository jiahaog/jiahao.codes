import GatsbyImage from 'gatsby-image';
import styled from 'styled-components';

const Image = styled(GatsbyImage)`
  @media only screen and (min-width: 740px) {
    width: ${({ width }) => width || '80vw'};

    /* need both to ensure that image scales relative to its center */
    left: 50%;
    transform: translateX(-50%);

    /* stops the scaling of the image when the image width is smaller than the layout min-width and
     * before the media queries kick in */
    min-width: 740px;
  }

  @media only screen and (max-width: 740px) {
    margin-left: -1rem;
    margin-right: -1rem;
  }
`;

export default Image;
