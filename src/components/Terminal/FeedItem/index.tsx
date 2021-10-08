import React, { useEffect, useRef, useState } from 'react';
import { CommandType } from '../../../models/command';
import { TextArea } from '../../TextArea';
import { FeedItemContainer } from './styles';

interface IProps {
    className?: string;
    id: string;
    ps1?: string;
    body: string;
    type?: CommandType;
}

export const FeedItem: React.FC<IProps> = ({
    className = '',
    id,
    ps1 = '$',
    body,
    type = CommandType.COMMAND,
}) => {
    const [height, setHeight] = useState(0);
    const textareaRef = useRef(null);

    useEffect(() => {
        setHeight(textareaRef.current.scrollHeight);
    }, [textareaRef.current])

    return (
        <FeedItemContainer className={ `${className} ${type.toLowerCase()}` }>
            { type === CommandType.COMMAND && <div className='ps1'>{ ps1 }</div> }
            <TextArea
                className='feed-item-body'
                textareaClassName='textarea'
                textareaId={ id }
                textareaRef={ (ref: HTMLElement) => textareaRef.current = ref }
                value={ body }
                style={{ height }}
                readOnly
            />
        </FeedItemContainer>
    )
}