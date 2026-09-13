import * as React from 'react';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCogs, faLayerGroup, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useStoreState } from 'easy-peasy';
import { ApplicationStore } from '@/state';
import SearchContainer from '@/components/dashboard/search/SearchContainer';
import tw from 'twin.macro';
import styled from 'styled-components/macro';
import http from '@/api/http';
import SpinnerOverlay from '@/components/elements/SpinnerOverlay';
import Tooltip from '@/components/elements/tooltip/Tooltip';
import Avatar from '@/components/Avatar';

const RightNavigation = styled.div`
    & > a,
    & > button,
    & > .navigation-link {
        ${tw`flex items-center h-full no-underline text-gray-500 px-5 cursor-pointer transition-all duration-150`};

        &:active,
        &:hover {
            ${tw`text-cyan-700 bg-white/70`};
        }

        &:active,
        &:hover,
        &.active {
            box-shadow: inset 0 -2px #38bdf8;
        }
    }
`;

const NavigationShell = styled.div`
    background: rgba(255, 255, 255, 0.78);
    border-bottom: 1px solid rgba(56, 189, 248, 0.22);
    box-shadow: 0 12px 32px rgba(14, 165, 233, 0.1);
    backdrop-filter: blur(18px);
`;

const BrandMark = styled.span`
    display: inline-grid;
    place-items: center;
    width: 2.25rem;
    height: 2.25rem;
    margin-right: 0.65rem;
    border-radius: 0.8rem;
    color: white;
    background: linear-gradient(135deg, #0284c7, #38bdf8);
    box-shadow: 0 8px 18px rgba(14, 165, 233, 0.28);
    font-size: 0.9rem;
    font-weight: 800;
    letter-spacing: -0.08em;
`;

export default () => {
    const rootAdmin = useStoreState((state: ApplicationStore) => state.user.data!.rootAdmin);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const onTriggerLogout = () => {
        setIsLoggingOut(true);
        http.post('/auth/logout').finally(() => {
            // @ts-expect-error this is valid
            window.location = '/';
        });
    };

    return (
        <NavigationShell className={'w-full overflow-x-auto'}>
            <SpinnerOverlay visible={isLoggingOut} />
            <div className={'mx-auto w-full flex items-center h-[3.5rem] max-w-[1200px]'}>
                <div id={'logo'} className={'flex-1'}>
                    <Link
                        to={'/'}
                        className={
                            'flex items-center text-2xl font-header font-medium px-4 no-underline text-gray-800 hover:text-cyan-700 transition-colors duration-150'
                        }
                    >
                        <BrandMark>CD</BrandMark>
                        CD Panel
                    </Link>
                </div>
                <RightNavigation className={'flex h-full items-center justify-center'}>
                    <SearchContainer />
                    <Tooltip placement={'bottom'} content={'Dashboard'}>
                        <NavLink to={'/'} exact>
                            <FontAwesomeIcon icon={faLayerGroup} />
                        </NavLink>
                    </Tooltip>
                    {rootAdmin && (
                        <Tooltip placement={'bottom'} content={'Admin'}>
                            <a href={'/admin'} rel={'noreferrer'}>
                                <FontAwesomeIcon icon={faCogs} />
                            </a>
                        </Tooltip>
                    )}
                    <Tooltip placement={'bottom'} content={'Account Settings'}>
                        <NavLink to={'/account'}>
                            <span className={'flex items-center w-5 h-5'}>
                                <Avatar.User />
                            </span>
                        </NavLink>
                    </Tooltip>
                    <Tooltip placement={'bottom'} content={'Sign Out'}>
                        <button onClick={onTriggerLogout}>
                            <FontAwesomeIcon icon={faSignOutAlt} />
                        </button>
                    </Tooltip>
                </RightNavigation>
            </div>
        </NavigationShell>
    );
};
