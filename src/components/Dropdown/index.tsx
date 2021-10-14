import React, { useEffect, useState } from 'react';
import { ButtonType } from '../Button';
import { ChevronIcon, ChevronOrientation } from '../svgs/icons/ChevronIcon';
import { PopoverType, TinyPopover } from '../TinyPopover';

import { AnchorContainer, DropdownContainer, OptionsContainer, Option } from './styles';

export interface IDropdownOption<T> {
    context: T;
    id: string;
    text: string;
}

interface IDropdownAnchorConfig<T> {
    isOpen: boolean;
    selectedOption?: IDropdownOption<T>;
    selectedOptions?: IDropdownOption<T>[];
}

interface IProps<T> {
    className?: string;
    defaultSelectedOption?: IDropdownOption<T>;
    defaultSelectedOptions?: IDropdownOption<T>[];
    engageOnHover?: boolean;
    isMultiSelect?: boolean;
    options: IDropdownOption<T>[];
    onOptionChange?:(option: IDropdownOption<T>) => void;
    onOptionsChange?:(option: IDropdownOption<T>[]) => void;
    onRenderAnchor?:(config: IDropdownAnchorConfig<T>) => JSX.Element;
    onRequestClose?:(config: IDropdownAnchorConfig<T>) => void;
}

export const Dropdown = <T extends any>({
    isMultiSelect,
    className = '',
    engageOnHover,
    options,
    defaultSelectedOption,
    defaultSelectedOptions,
    onOptionChange,
    onOptionsChange,
    onRenderAnchor,
    onRequestClose,
}: IProps<T>) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<IDropdownOption<T>>(!isMultiSelect ? (defaultSelectedOption || options[0]) : null);
    const [selectedOptions, setSelectedOptions] = useState<IDropdownOption<T>[]>(isMultiSelect ? (defaultSelectedOptions || [options[0]]) : null);

    useEffect(() => {
        if (!isOpen) onRequestClose?.({ isOpen: false, selectedOption, selectedOptions });
    }, [isOpen]);

    useEffect(() => {
        if (!isMultiSelect) {
            if (!onOptionChange) throw new Error('no onOptionChange handler found');
            onOptionChange(selectedOption);
        }
    }, [selectedOption]);

    useEffect(() => {
        if (isMultiSelect) {
            if (!onOptionsChange) throw new Error('no onOptionsChange handler found');
            onOptionsChange(selectedOptions);
        }
    }, [selectedOptions]);

    const _onOptionClick = (option: IDropdownOption<T>) => () => {
        if (isMultiSelect) {
            const isSelected = selectedOptions.find(o => o.id === option.id);
            let updated = [...selectedOptions];
            if (isSelected) {
                // is being deselected
                updated = updated.filter(o => o.id !== option.id);
            } else {
                // is being selected
                updated.push(option);
            }

            setSelectedOptions(updated);
        } else {
            setIsOpen(false);
            setSelectedOption(option);
        }
    }

    const _renderAnchor = () => {
        const anchor = !!onRenderAnchor
            ? onRenderAnchor({ isOpen, selectedOption, selectedOptions })
            : isMultiSelect
                ? (
                    <div>
                        { selectedOptions.map(o => o.text).join(', ') || '--' }
                    </div>
                )
                : (
                    <div>
                        { selectedOption.text || '--'}
                    </div>
                )

        return (
            <AnchorContainer
                buttonType={ ButtonType.Blank }
                className='dropdown-anchor'
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={!!engageOnHover ? () => setIsOpen(true) : null}
                onMouseLeave={!!engageOnHover ? () => setIsOpen(true) : null}
            >
                { anchor }
                <div className='chevron'>
                    <ChevronIcon orientation={ isOpen ? ChevronOrientation.Up : ChevronOrientation.Down } />
                </div>
            </AnchorContainer>
        )
    }

    const renderOptions = () => {
        const _options = options.map(option => {
            const classes = ['option'];

            if (isMultiSelect) {
                if (!!selectedOptions.find(o => o.id === option.id)) classes.push('selected');
            } else {
                if (selectedOption.id === option.id) classes.push('selected');
            }

            return (
                <Option
                    key={ option.id }
                    buttonType={ ButtonType.Blank }
                    className={ classes.join(' ') }
                    onClick={ _onOptionClick(option) }
                >
                    { option.text }
                </Option>
            )
        })

        return (
            <OptionsContainer className='dropdown-options-container'>
                { _options }
            </OptionsContainer>
        )
    };

    return (
        <DropdownContainer className={ className }>
            <TinyPopover
                dismissOnOutsideAction
                anchor={ _renderAnchor() }
                isOpen={ isOpen }
                onRequestClose={() => setIsOpen(false)}
                type={ PopoverType.primaryDark }
            >
                { renderOptions() }
            </TinyPopover>
        </DropdownContainer>
    );
}
