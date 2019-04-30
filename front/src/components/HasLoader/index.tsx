import React from 'react';
import Loader from '../Loader';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0.3, 0.3, 0.3, 0.3);
  justify-content: center;
  align-items: center;
  display: flex;
`;

export interface HasLoaderProps {
  loading: boolean;
}

const HasLoader = (Component: any) => (props: any) => (
  <Wrapper>
    <Component {...props} />
    {props.loading && (
      <Overlay>
        <Loader />
      </Overlay>
    )}
  </Wrapper>
);

HasLoader.defaultProps = {
  loading: false
};

export default HasLoader;
