import { observer } from 'mobx-react';
import React, { ChangeEvent, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { DnDContext } from '../../contexts/DnD';
import { IDnDExp } from '../../models/dnd';
import { IDnDClass } from '../../models/dnd/class';
import { PCModel } from '../../models/dnd/pc';
import { IDnDRace } from '../../models/dnd/race';
import { NoteModel } from '../../models/notes';
import { AddItemToInventoryModal } from '../AddItemToInventoryModal';
import { ButtonType } from '../Button';
import { CTAs } from '../CtasContainer';
import { Dropdown, IDropdownOption } from '../Dropdown';
import { LoadingSpinner, SpinnerSize, SpinnerType } from '../LoadingSpinner';
import { ModalSize } from '../Modal';
import { SimpleNoteList } from '../SimpleNoteList';
import { TextInput } from '../TextInput';

import { DnDPCModalContainer, FieldContainer, InventoryContainer, LeftCol, NameContainer, NoteEditor } from './styles';

interface IProps {
    className?: string;
    isOpen?: boolean;
    onClose:() => void;
    onSave(pc?: PCModel): void;
    pc?: PCModel;
}

export const DnDPCModalBase: React.FC<IProps> = ({ className = '', isOpen, onClose, onSave, pc }) => {
    const dnd = useContext(DnDContext);
    const [name, setName] = useState(pc?.name || '');
    const [nameError, setNameError] = useState('');
    const [age, setAge] = useState(pc?.age || 30);
    const [ageError, setAgeError] = useState('');
    const [exp, setExp] = useState(pc?.exp || 0);
    const [expError, setExpError] = useState('');
    const [error, setError] = useState('');
    const [editMode, setEditMode] = useState(!pc);
    const [selectedClassOptions, setSelectedClassOption] = useState<IDropdownOption<IDnDClass>[]>([]);
    const [selectedLevelOption, setSelectedLevelOption] = useState<IDropdownOption<IDnDExp>>(null);
    const [selectedRaceOption, setSelectedRaceOption] = useState<IDropdownOption<IDnDRace>>(null);
    const [classOptions, setClassOptions] = useState<IDropdownOption<IDnDClass>[]>([]);
    const [levelOptions, setLevelOptions] = useState<IDropdownOption<IDnDExp>[]>([]);
    const [raceOptions, setRaceOptions] = useState<IDropdownOption<IDnDRace>[]>([]);
    const [noteContent, setNoteContent] = useState('');
    const [showAddItemModal, setShowAddItemModal] = useState(false);
    const nameRef = useRef<HTMLInputElement>(null);
    const noteRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {        
        dnd.getClasses()
            .catch((err: any) => {
                console.error('error getting classes');
                console.log(err);
            });

        dnd.getRaces()
            .catch((err: any) => {
                console.error('error getting races');
                console.log(err);
            });

        dnd.getLevels()
            .catch((err: any) => {
                console.error('error getting races');
                console.log(err);
            });
        
        pc?.note?.load()
            .then(() => setNoteContent(pc.note.text))
            .catch((err: any) => {
                console.error('error loading PC note');
                console.log(err);
            });
        
        pc?.loadInventory()
            .catch((err: any) => {
                console.error('error loading PC inventory');
                console.log(err);
            });
    }, []);

    useEffect(() => {
        if (isOpen && editMode) {
            if (!!name) {
                noteRef.current?.focus();
                const endIndex = noteRef.current.value.length;
                noteRef.current.setSelectionRange(endIndex, endIndex);
                noteRef.current.scrollTop = noteRef.current.scrollHeight;
            } else {
                nameRef.current?.focus();
            }
        }
    }, [isOpen, editMode]);

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
            const selectedOptions = options.filter(o => !!pc?.classes?.find(c => o.context.id === c.id));
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
        setName(pc?.name || '');
        setNameError('');
        setAge(pc?.age || 30);
        setAgeError('');
        setExp(pc?.exp || 0);
        setExpError('');
        setNoteContent(pc?.note?.text || '');

        const defaultClasses = !!pc?.classes?.length
            ? classOptions.filter(opt =>  {
                return pc.classes.find(c => c.id === opt.context.id);
            })
            : [classOptions[0]];
        setSelectedClassOption(defaultClasses);

        const defaultLevel = !!pc?.level
            ? levelOptions.find(opt => opt.context.level === pc.level)
            : levelOptions[0];
        setSelectedLevelOption(defaultLevel);

        const defaultRace = !!pc?.race
            ? raceOptions.find(opt => opt.context.id === pc.race.id)
            : raceOptions[0];
        setSelectedRaceOption(defaultRace);
    }

    const onAddItems = useCallback((items: NoteModel[]) => {
        pc.updateInventory(items.map(item => item.id))
            .then(() => setShowAddItemModal(false))
            .catch(err => {
                console.log('error updating inventory');
                console.log(err);
            });
    }, []);

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

    const onCancelAddItems = useCallback(() => {
        setShowAddItemModal(false);
    }, []);

    const onCancelClick = () => {
        reset();
        setEditMode(false);
        if (!name) onClose();
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

    const onNameRef = (ref: HTMLInputElement) => {
        nameRef.current = ref;
    };

    const onNoteRef = (ref: HTMLTextAreaElement) => {
        noteRef.current = ref;
    }

    const onPCCreateClick = async () => {
        try {
            const newPC = await dnd.campaign.createPC(name,
                selectedRaceOption.context.id,
                selectedClassOptions.map(o => o.context.id),
                age,
                exp,
                selectedLevelOption.context.level);
            
            await newPC.note.save({ text: noteContent });
            onSave(newPC);
            setEditMode(false);
        } catch (err: any) {
            setError(err.message);
        }
    }

    const onPCSaveClick = async () => {
        try {
            await pc.update(name,
                selectedRaceOption.context.id,
                selectedClassOptions.map(o => o.context.id),
                age,
                exp,
                selectedLevelOption.context.level);
            await pc.note.save({ text: noteContent });
            reset();
            setEditMode(false);
        } catch (err: any) {
            setError(err.message);
        }
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
            header={
                editMode
                    ? (
                        <NameContainer>
                            <TextInput
                                className='name-input'
                                inputId='pc-name-input'
                                onChange={ onNameChange }
                                inputRef={ onNameRef }
                                value={ name }
                            />
                            { nameError && <div className='error'>{ nameError }</div>}
                        </NameContainer>
                    )
                    : pc?.name
            }
            onClose={ onClose }
            size={ ModalSize.Large }
        >
            <div className='pc-upper-ctas-container'>
                {
                    !editMode && (
                        <CTAs
                            ctas={[
                                {
                                    text: 'edit',
                                    type: ButtonType.Blank,
                                    onClick: () => setEditMode(true)
                                }
                            ]}
                        />
                    )
                }
            </div>
            <div className='main'>
                <LeftCol>
                    <FieldContainer>
                        <div className='label'>race</div>
                        {
                            editMode
                                ? renderRacesDropdown()
                                : <div>{ pc?.race?.name }</div>
                        }
                    </FieldContainer>
                    <FieldContainer>
                        <div className='label'>classes</div>
                        {
                            editMode
                                ? renderClassesDropdown()
                                : <div>{ pc?.classes?.map(c => c.name).join(', ') }</div>
                        }
                    </FieldContainer>
                    <FieldContainer>
                        <div className='label'>age</div>
                        {
                            editMode
                                ? (
                                    <>
                                        <TextInput
                                            inputId='pc-age-input'
                                            onChange={ onAgeChange }
                                            type='number'
                                            value={ age ?? '' }
                                        />
                                        { !!ageError && <div className='error'>{ ageError }</div>}
                                    </>
                                )
                                : <div>{ pc?.age }</div>
                        }
                    </FieldContainer>
                    <FieldContainer>
                        <div className='label'>exp</div>
                        {
                            editMode
                                ? (
                                    <>
                                        <TextInput
                                            inputId='pc-exp-input'
                                            onBlur={ onExpBlur }
                                            onChange={ onExpChange }
                                            type='number'
                                            value={ exp ?? '' }
                                        />
                                        { !!expError && <div className='error'>{ expError }</div>}
                                    </>
                                )
                                : <div>{ pc?.exp }</div>
                        }
                    </FieldContainer>
                    <FieldContainer>
                        <div className='label'>level</div>
                        {
                            editMode
                                ? renderLevelsDropdown()
                                : <div>{ pc?.level }</div>
                        }
                    </FieldContainer>
                    { !!error && <div className='error'>{ error }</div>}
                    { !editMode && !!pc && (
                        <InventoryContainer>
                            <div className='header'>Inventory</div>
                            <SimpleNoteList
                                className='inventory-list'
                                notes={ pc.inventory }
                            />
                            <CTAs
                                ctas={[
                                    {
                                        text: '+ add item',
                                        type: ButtonType.Blank,
                                        onClick: () => setShowAddItemModal(true),
                                    }
                                ]}
                            />
                            { (pc?.loadingInventory || pc?.updatingInventory) && <LoadingSpinner size={SpinnerSize.Small} /> }
                        </InventoryContainer>
                    ) }
                </LeftCol>
                <NoteEditor
                    className='pc-note-editor'
                    content={ noteContent }
                    editMode={ editMode }
                    id='pc-note-editor'
                    onChange={c => setNoteContent(c)}
                    noteRef={ onNoteRef }
                />
                { (pc?.busy || dnd.campaign.creatingPC) && <LoadingSpinner size={ SpinnerSize.Medium } /> }
            </div>
            {
                editMode && (
                    <CTAs
                        ctas={ [
                            {
                                disabled: !name || !selectedRaceOption || !selectedClassOptions?.length || !age || !(typeof exp === 'number') || !selectedLevelOption,
                                text: !!pc ? 'save' : 'create',
                                type: ButtonType.Primary,
                                onClick: !!pc ? onPCSaveClick : onPCCreateClick
                            },
                            {
                                text: 'cancel',
                                type: ButtonType.BlankReverse,
                                onClick: onCancelClick
                            }
                        ] }
                    />
                )
            }
            {
                <AddItemToInventoryModal
                    defaultItems={ pc?.inventory }
                    isOpen={ showAddItemModal && !!pc }
                    onCancel={ onCancelAddItems }
                    onSave={ onAddItems }
                    saving={ pc?.updatingInventory }
                />
            }
        </DnDPCModalContainer>
    );
}

export const DnDPCModal = observer(DnDPCModalBase);
