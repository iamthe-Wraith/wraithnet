import { observer } from 'mobx-react';
import React, { useContext } from 'react';
import { withTheme } from 'styled-components';
import { ErrorMessagesContext } from '../../contexts/ErrorMessages';
import { IThemeProps } from '../../styles/themes';
import { ButtonType } from '../Button';
import { CTAs } from '../CtasContainer';

import { ErrorMessageModalContainer } from './styles';

interface IProps extends IThemeProps {
  className?: string;
}

const ErrorMessageModalBase: React.FC<IProps> = ({
  className = '',
  theme,
}) => {
  const errorMessages = useContext(ErrorMessagesContext);

  const onClose = () => errorMessages.resolveCurrentMessage();

  return (
    <ErrorMessageModalContainer
      borderColor={ theme.error }
      className={ className }
      header={ errorMessages.currentErrorMessage?.title ?? 'Error' }
      isOpen={ !!errorMessages.currentErrorMessage }
      onClose={ onClose }
    >
      <div className='error-message'>
        { errorMessages.currentErrorMessage?.message }
      </div>
      <CTAs
        ctas={ [
          {
            text: 'Got it',
            type: ButtonType.Error,
            onClick: onClose,
          },
        ] }
      />
    </ErrorMessageModalContainer>
  );
};

const ErrorMessageModalAsObserver = observer(ErrorMessageModalBase);
export const ErrorMessageModal = withTheme(ErrorMessageModalAsObserver);
