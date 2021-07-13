import React from 'react';

type propsType = {
  callBack: () => void;
  value: string;
};

export default function Button(props: propsType) {
  const onClickHandler = () => props.callBack();

  return <button onClick={onClickHandler}>{props.value}</button>;
}
