import React from 'react';
import { Link } from 'react-router-dom';

export default function ActionLink({route, text}) {
  return (
      <Link to={route}>{text}</Link>
  );
}
