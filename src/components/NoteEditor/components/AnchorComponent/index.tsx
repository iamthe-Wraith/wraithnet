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

  const onClick = (e: MouseEvent) => {
    e.preventDefault();
    IpcRenderer.navigate(href);
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
