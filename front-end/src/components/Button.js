import React from 'react';

const Button = ({title, style, loader, action}) => {
  return <button className={'bg-blue-600 hover:bg-blue-700 px-5 py-1 text-white text-sm rounded-sm hover:shadow-md'} onClick={action}>{title}</button>;
}

export default Button;
