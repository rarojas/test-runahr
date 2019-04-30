import styled, { keyframes } from "styled-components";

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

export default styled.div`
    border: 5px solid #f3f3f3;
    border-radius: 50%;
    border-top: 5px solid #3498db;
    width: 120px;
    height: 120px;
    animation: ${spin} 1s linear infinite;
`;