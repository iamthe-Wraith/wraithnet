import { observer } from 'mobx-react-lite';
import React, { useCallback, useContext, useEffect } from 'react';
import { DnDContext } from '../../contexts/DnD';
import { ICampaignStats } from '../../models/dnd/campaign';
import { Hex } from '../containers/Hex';
import { HexSize } from '../containers/Hex/styles';
import { Dots } from '../Dots';
import { LoadingSpinner, SpinnerSize } from '../LoadingSpinner';
import { Stat } from '../Stat';
import { CrossedSwordsIcon } from '../svgs/icons/CrossedSwordsIcon';

import { DnDMainHomeContainer, StatPosition, StatsContainer } from './styles';

interface IProps {
    className?: string;
}

// number of days ago the campaign started
// number of days (in game) that have ellapsed in game
// last session date

const DnDMainHomeBase: React.FC<IProps> = ({ className = '' }) => {
    const dnd = useContext(DnDContext);

    useEffect(() => {
        dnd.campaign.getStats()
            .catch(err => {
                console.log('error getting stats');
                console.log(err);
            });
    }, []);

    const renderStats = () => {
        if (!dnd.campaign.stats) return null;

        const stats = ([
            ['sessions', StatPosition.Top],
            ['quests', StatPosition.RightTop],
            ['items', StatPosition.RightBottom],
            ['pcs', StatPosition.Bottom],
            ['locations', StatPosition.LeftBottom],
            ['npcs', StatPosition.LeftTop],
        ] as [keyof ICampaignStats, StatPosition][]).map(([name, position]) => {
            return (
                <Stat
                    className={ `dnd-stat ${position}` }
                    key={ name }
                    label={ name }
                    value={ dnd.campaign.stats[name] }
                />
            )
        })

        return (
            <StatsContainer>
                <div className='center'>
                    { stats }
                    <Hex size={ HexSize.XLarge }>
                        <CrossedSwordsIcon className='center-icon' />
                    </Hex>
                </div>
            </StatsContainer>
        )
    }

    return (
        <DnDMainHomeContainer className={ className }>
            <div className='data-container'>
                {
                    dnd.campaign.gettingStats
                        ? <LoadingSpinner size={ SpinnerSize.Large } />
                        : renderStats()
                }
            </div>
            <Dots className='dots' height='150px' />
        </DnDMainHomeContainer>
    );
}

export const DnDMainHome = observer(DnDMainHomeBase);
