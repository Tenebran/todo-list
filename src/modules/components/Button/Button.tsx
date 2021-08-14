import React from 'react';

type propsType = {
  callBack: () => void;
  value: string;
};

const Button = React.memo((props: propsType) => {
  const onClickHandler = () => props.callBack();

  return <button onClick={onClickHandler}>{props.value}</button>;
});

export default Button;
