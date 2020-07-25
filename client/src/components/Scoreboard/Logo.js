import React from 'react';

const Logo = (abbreviation, type) => {
  const images = require.context('../../assets/logos', true);
  let img = images('./' + abbreviation + '.svg');

  return (
    <img className={"team-logo " + type + " " + abbreviation} src={img} alt={abbreviation}/>
  )
}

export default Logo;