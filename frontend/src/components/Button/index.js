import React from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

export default function Button({children, ...rest}) {
  return (
    <Container {...rest}>
      <button>{children}</button>
    </Container>
  );
}

Button.propTypes = {
  children: PropTypes.string.isRequired,
};

