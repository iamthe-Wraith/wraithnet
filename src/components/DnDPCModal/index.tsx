import { observer } from 'mobx-react';
import { resetGlobalState } from 'mobx/dist/internal';
import React, { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { DnDContext } from '../../contexts/DnD';
import { IDnDExp } from '../../models/dnd';
import { IDnDClass } from '../../models/dnd/class';
import { PCModel } from '../../models/dnd/pc';
import { IDnDRace } from '../../models/dnd/race';
import { ButtonType } from '../Button';
import { CTAs, ICta } from '../CtasContainer';
import { Dropdown, IDropdownOption } from '../Dropdown';
import { LoadingSpinner, SpinnerSize, SpinnerType } from '../LoadingSpinner';
import { TextInput } from '../TextInput';

import { DnDPCModalContainer, FieldContainer } from './styles';

interface IProps {
    className?: string;
    isOpen?: boolean;
    onClose:() => void;
    pc?: PCModel;
}

export const DnDPCModalBase: React.FC<IProps> = ({ className = '', isOpen, onClose, pc }) => {
    const dnd = useContext(DnDContext);
    const [name, setName] = useState(pc?.name || '');
    const [nameError, setNameError] = useState('');
    const [age, setAge] = useState(pc?.age || 30);
    const [ageError, setAgeError] = useState('');
    const [exp, setExp] = useState(pc?.exp || 0);
    const [expError, setExpError] = useState('');
    const [error, setError] = useState('');
    const [selectedClassOptions, setSelectedClassOption] = useState<IDropdownOption<IDnDClass>[]>([]);
    const [selectedLevelOption, setSelectedLevelOption] = useState<IDropdownOption<IDnDExp>>(null);
    const [selectedRaceOption, setSelectedRaceOption] = useState<IDropdownOption<IDnDRace>>(null);
    const [classOptions, setClassOptions] = useState<IDropdownOption<IDnDClass>[]>([]);
    const [levelOptions, setLevelOptions] = useState<IDropdownOption<IDnDExp>[]>([]);
    const [raceOptions, setRaceOptions] = useState<IDropdownOption<IDnDRace>[]>([]);

    useEffect(() => {        
        dnd.getClasses()
            .catch((err: any) => {
                console.error('error getting classes', err);
            });

        dnd.getRaces()
            .catch((err: any) => {
                console.error('error getting races', err);
            });

        dnd.getLevels()
            .catch((err: any) => {
                console.error('error getting races', err);
            });
    }, []);

    useEffect(() => {
        if (!!dnd?.classes?.length) {
            const options = dnd.classes.map(c => {
                return {
                    context: c,
                    id: c.id,
                    text: c.name,
                }
            });

            setClassOptions(options);
            const selectedOptions = options.filter(o => !!dnd.classes.find(c => o.context.id === c.id));
            setSelectedClassOption(!!selectedOptions.length ? selectedOptions : [options[0]]);
        }
    }, [dnd?.classes]);

    useEffect(() => {
        if (!!dnd?.levels?.length) {
            const options: IDropdownOption<IDnDExp>[] = dnd.levels.map(level => {
                return {
                    context: level,
                    id: `level-${level.level}`,
                    text: `${level.level}`,
                }
            });

            setLevelOptions(options);
            setSelectedLevelOption(options.find(o => o.context.level === pc?.level) ?? options[0]);
        }
    }, [dnd?.levels])

    useEffect(() => {
        if (!!dnd?.races?.length) {
            const options = dnd.races.map(race => {
                return {
                    context: race,
                    id: race.id,
                    text: race.name,
                }
            });

            setRaceOptions(options);
            setSelectedRaceOption(options.find(o => o.context.id === pc?.race?.id) ?? options[0]);
        }
    }, [dnd?.races]);

    const reset = () => {
        setName('');
        setNameError('');
        setAge(30);
        setAgeError('');
        setExp(0);
        setExpError('');
        setSelectedClassOption([classOptions[0]]);
        setSelectedLevelOption(levelOptions[0]);
        setSelectedRaceOption(raceOptions[0]);
    }

    const onAgeChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) {
            setAgeError('');
            setAge(null);
            return;
        }
        
        const value = parseInt(e.target.value);
        if (isNaN(value)) {
            setAgeError('invalid age');
        } else {
            setAgeError('');
            setAge(value);
        }
    }

    const onCancelClick = () => {
        reset();
        onClose();
    }

    const onActionClick = () => {
        (!!pc ? pc.update : dnd.campaign.createPC)(
            name,
            selectedRaceOption.context.id,
            selectedClassOptions.map(o => o.context.id),
            age,
            exp,
            selectedLevelOption.context.level
        )
            .then(() => {
                reset();
                // TODO: show confirmation
                onClose();
            })
            .catch((err: any) => {
                setError(err.message);
            });
    }

    const onExpBlur = () => {
        if (!exp) {
            setExp(0);
            return;
        }

        if ((!!pc && exp !== pc.exp) || !pc) {
            let lvl: IDnDExp;

            for (let i = 0; i < dnd.levels.length; i++) {
                if (dnd.levels[i].threshold <= exp) {
                    const upper = dnd.levels[i + 1];
                    if (upper) {
                        if (upper.threshold > exp) {
                            lvl = dnd.levels[i];
                        }
                    } else {
                        // is lvl 20
                        lvl = dnd.levels[dnd.levels.length - 1];
                    }
                }
            }

            const lvlToSet = levelOptions.find(l => l.context.level === lvl.level);
            setSelectedLevelOption(lvlToSet);
        }
    }

    const onExpChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.target.value) {
            setExpError('');
            setExp(null);
            return;
        }
        
        const value = parseInt(e.target.value);
        if (isNaN(value)) {
            setExpError('invalid exp');
        } else {
            setExpError('');
            setExp(value);
        }
    }

    const onLevelChange = (option: IDropdownOption<IDnDExp>) => {
        if (option.context.level !== selectedLevelOption.context.level) {
            setSelectedLevelOption(option);
            setExp(option.context.threshold);
        }
    }

    const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNameError('');
        setName(e.target.value)
    }

    const renderClassesDropdown = () => {
        if (dnd.loadingClasses || !classOptions?.length) {
            return (
                <div className='spinner-container'>
                    <LoadingSpinner className='spinner' size={ SpinnerSize.Tiny } type={ SpinnerType.Random } />
                </div>
            )
        }

        return (
            <Dropdown
                isMultiSelect
                options={ classOptions }
                defaultSelectedOptions={ selectedClassOptions || [classOptions[0]] }
                onOptionsChange={options => setSelectedClassOption(options)}
                optionStyles={{ justifyContent: 'flex-start', width: '150px' }}
            />
        )
    }

    const renderLevelsDropdown = () => {
        if (dnd.loadingLevels || !levelOptions?.length) {
            return (
                <div className='spinner-container'>
                    <LoadingSpinner className='spinner' size={ SpinnerSize.Tiny } type={ SpinnerType.Random } />
                </div>
            )
        }

        return (
            <Dropdown
                options={ levelOptions }
                defaultSelectedOption={ selectedLevelOption || levelOptions[0] }
                onOptionChange={ onLevelChange }
                optionStyles={{ justifyContent: 'flex-start', width: '150px' }}
            />
        )
    }

    const renderRacesDropdown = () => {
        if (dnd.loadingRaces || !raceOptions?.length) {
            return (
                <div className='spinner-container'>
                    <LoadingSpinner className='spinner' size={ SpinnerSize.Tiny } type={ SpinnerType.Random } />
                </div>
            )
        }

        return (
            <Dropdown
                options={ raceOptions }
                defaultSelectedOption={ selectedRaceOption || raceOptions[0] }
                onOptionChange={option => setSelectedRaceOption(option)}
                optionStyles={{ justifyContent: 'flex-start', width: '150px' }}
            />
        )
    }

    return (
        <DnDPCModalContainer
            className={ className }
            isOpen={ isOpen }
            header={`${!!pc ? 'Edit' : 'Create'} PC`}
            onClose={ onClose }
        >
            <FieldContainer>
                <div className='label'>character name</div>
                <TextInput
                    inputId='pc-name-input'
                    onChange={ onNameChange }
                    value={ name }
                />
                { !!nameError && <div className='error'>{ nameError }</div>}
            </FieldContainer>
            <div className='flex-row'>
                <FieldContainer>
                    <div className='label'>race</div>
                    { renderRacesDropdown() }
                </FieldContainer>
                <FieldContainer>
                    <div className='label'>classes</div>
                    { renderClassesDropdown() }
                </FieldContainer>
            </div>
            <div className='flex-row'>
                <FieldContainer>
                    <div className='label'>age</div>
                    <TextInput
                        inputId='pc-age-input'
                        onChange={ onAgeChange }
                        type='number'
                        value={ age ?? '' }
                    />
                    { !!ageError && <div className='error'>{ ageError }</div>}
                </FieldContainer>
                <FieldContainer>
                    <div className='label'>exp</div>
                    <TextInput
                        inputId='pc-exp-input'
                        onBlur={ onExpBlur }
                        onChange={ onExpChange }
                        type='number'
                        value={ exp ?? '' }
                    />
                    { !!expError && <div className='error'>{ expError }</div>}
                </FieldContainer>
                <FieldContainer>
                    <div className='label'>level</div>
                    { renderLevelsDropdown() }
                </FieldContainer>
            </div>
            { !!error && <div className='error'>{ error }</div>}
            <CTAs
                ctas={ [
                    {
                        disabled: !name || !selectedRaceOption || !selectedClassOptions?.length || !age || !(typeof exp === 'number') || !selectedLevelOption,
                        text: !!pc ? 'save' : 'create',
                        type: ButtonType.Primary,
                        onClick: onActionClick
                    },
                    {
                        text: 'cancel',
                        type: ButtonType.BlankReverse,
                        onClick: onCancelClick
                    }
                ] }
            />
        </DnDPCModalContainer>
    );
}

export const DnDPCModal = observer(DnDPCModalBase);
