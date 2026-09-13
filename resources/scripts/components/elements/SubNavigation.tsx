import styled from 'styled-components/macro';
import tw from 'twin.macro';

const SubNavigation = styled.div`
    ${tw`w-full shadow overflow-x-auto`};
    background: rgba(255, 255, 255, 0.78);
    border-bottom: 1px solid #bae6fd;
    backdrop-filter: blur(18px);

    & > div {
        ${tw`flex items-center text-sm mx-auto px-2`};
        max-width: 1200px;

        & > a,
        & > div {
            ${tw`inline-block py-3 px-4 text-gray-500 no-underline whitespace-nowrap transition-all duration-150`};

            &:not(:first-of-type) {
                ${tw`ml-2`};
            }

            &:hover {
                ${tw`text-cyan-700`};
                transform: translateY(-1px);
            }

            &:active,
            &.active {
                ${tw`text-cyan-700`};
                box-shadow: inset 0 -2px #06b6d4;
            }
        }
    }
`;

export default SubNavigation;
