import React, { MouseEvent, useContext, useEffect, useState } from 'react';
import { ErrorMessagesContext } from '../../../../contexts/ErrorMessages';
import { DashboardIpcRenderer as IpcRenderer } from '../../../../models/ipcRenderers/dashboard';

interface IProps {
    className?: string;
    children?: (string | JSX.Element)[];
    href: string;
}

export const AnchorComponent: React.FC<IProps> = ({
    className = '',
    children,
    href,
}) => {
    const errorMessages = useContext(ErrorMessagesContext);

    const [text] = useState(children?.[0] || '');

    useEffect(() => {
        if (!text) errorMessages.push({
            message: 'A link with no text was found.',
            title: 'Markdown Error',
        });
    }, [text]);

    const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
        if (href.includes('http://') || href.includes('https://')) {
            e.preventDefault();
            IpcRenderer.navigate(href);
        } else if (href[0] === '#') {
            // necessary override as # breaks
            // with hash router.
            e.preventDefault();
            const el = document.getElementById(href.replace('#', ''));
            if (el) el.scrollIntoView();
        }
    };

    return (
        <a
            className={ className }
            href={ href }
            onClick={ onClick }
        >
            { text }
        </a>
    );
};
