import dayjs from 'dayjs';
import React, { useState } from 'react';
import { withTheme } from 'styled-components';
import { ICampaign } from '../../../models/dnd/types';
import { IThemeProps } from '../../../styles/themes';
import { ButtonType } from '../../Button';
import { AngleCorner } from '../../containers/AngleCorner';
import { AnglePos, AngleSize } from '../../containers/AngleCorner/styles';
import { CampaignContainer } from './styles';

interface IProps extends IThemeProps {
    className?: string;
    campaign: ICampaign;
    onClick:() => void;
}

const CampaignBase: React.FC<IProps> = ({
    campaign,
    className,
    onClick,
    theme,
}) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <CampaignContainer
            buttonType={ ButtonType.Blank }
            className={ `campaign-button ${ className }` }
            key={ campaign.id }
            onClick={ onClick }
            onMouseEnter={ () => setIsHovered(true) }
            onMouseLeave={ () => setIsHovered(false) }
        >
            <AngleCorner
                backgroundColor={ theme.darkestGray }
                borderColor={ isHovered ? theme.highlight1 : 'transparent' }
                borderWidth={ 1 }
                className='angle-corner'
                config={ [{ position: AnglePos.BottomRight, size: AngleSize.Tiny }] }
            >
                <h2 className='campaign-name'>{ campaign.name }</h2>
                <div className='campaign-created-date'>
                    { `campaign created on ${dayjs(campaign.createdAt).format('MMM DD, YYYY')}` }
                </div>
            </AngleCorner>
        </CampaignContainer>
    );
};

export const Campaign = withTheme(CampaignBase);
