import styled from 'styled-components';

export default styled.svg`
  width: ${({ width }) => width || '25px'};
  margin: 5px;
  opacity: 0.8;

  &:hover {
    opacity: 0.5;
  }

  @media only screen and (max-width: 740px) {
    opacity: ${({ enlargeOnMobile }) => enlargeOnMobile && '0.6'};
    width: ${({ enlargeOnMobile }) => enlargeOnMobile && '45px'};
  }
`;
