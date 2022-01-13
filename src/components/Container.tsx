import React from 'react';
import styled from 'styled-components';

function Container(props: { children: any; text: string; main?: boolean }) {
    const { children, text, main } = props;
    return (
        <>
            <ContainerBox>
                <TextBox main={main}>{text}</TextBox>
                {children}
            </ContainerBox>
        </>
    );
}

Container.defaultProps = {
    main: false,
};

const ContainerBox = styled.div`
    margin: 0 auto;
    width: 1140px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
`;

const TextBox = styled.div<{ main?: boolean }>`
    padding: 60px 0 40px;
    text-align: left;
    font-size: ${(props) => (props.main ? '25px' : '20px')};
    width: 1140px;
    font-weight: bold;
    color: rgb(34, 34, 34);
    cursor: default;
`;

export default Container;
