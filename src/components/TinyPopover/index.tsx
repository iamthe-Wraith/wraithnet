import { ArrowContainer, ArrowContainerProps, PopoverAlign, PopoverPosition } from 'react-tiny-popover';
import React from 'react';
import { ReactTinyPopover, ReactTinyPopoverContent } from './styles';
import { debounce } from '../../lib/utils';

interface IArrowRenderer {
	childRect: ClientRect;
	popoverRect: ClientRect;
	position: PopoverPosition;
}

interface IProps {
	align?: Exclude<PopoverAlign, 'custom'>;
	anchor: React.ReactNode;
	arrow?: Partial<ArrowContainerProps>;
	arrowSize?: number;
	children: React.ReactNode;
    className?: string;
	contentStyle?: Partial<CSSStyleDeclaration>; // trigger
	disabled?: boolean;
	dismissOnOutsideAction?: boolean;
	engageOnHover?: boolean;
	isOpen?: boolean;
	onRequestClose?(): void;
	placement?: Exclude<PopoverPosition, 'custom'>[];
	tipSize?: number;
	transitionDuration?: number;
	type?: PopoverType;
}

interface IState {
	arrowColor?: string;
	containerClassName?: string;
	isMousedOver?: boolean;
	isOpen?: boolean;
}

export enum PopoverType {
	custom = 0,
	error,
    light,
    primary,
    primaryDark,
    highlight,
}

const getStylesByType = (type: PopoverType) => {
	switch (type) {
		case PopoverType.error: {
			return {
				containerClassName: 'tiny-popover-error',
			};
		}
		case PopoverType.light: {
			return {
				containerClassName: 'tiny-popover-light',
			};
		}
        case PopoverType.primary: {
			return {
				containerClassName: 'tiny-popover-primary',
			};
		}
        case PopoverType.primaryDark: {
			return {
				containerClassName: 'tiny-popover-primary-dark',
			};
		}
        case PopoverType.highlight: {
            return {
				containerClassName: 'tiny-popover-highlight',
			};
        }
		default: {
			return null;
		}
	}
};

export class TinyPopover extends React.Component<IProps, IState> {
	public static defaultProps: IProps = {
		anchor: null,
		children: null,
		type: PopoverType.custom,
	};

	public static getDerivedStateFromProps(props: IProps, state: IState) {
		const nextState: IState = {};

		if (state.isOpen !== props.isOpen) {
			nextState.isOpen = props.isOpen;
		}

		return Object.keys(nextState).length > 0 ? nextState : null;
	}

	constructor(props: IProps) {
		super(props);

		this.state = {
			isOpen: props.isOpen,
			...getStylesByType(props.type),
		};
	}

	public componentDidMount() {
		if (this.props.dismissOnOutsideAction) {
			this.watchForOutsideAction();
		}

		window.addEventListener('select-close', this.onOuterAction);
	}

	public componentWillUnmount() {
		if (this.props.dismissOnOutsideAction) {
			this.stopWatchingForOutsideAction();
		}

		window.removeEventListener('select-close', this.onOuterAction);
	}

	public render() {
		const {
			align,
			anchor,
            className = '',
			contentStyle,
			disabled,
			engageOnHover,
			placement,
			transitionDuration,
		} = this.props;
		const { isOpen } = this.state;

		return (
			<ReactTinyPopover
				align={ align || 'start' }
				containerClassName={ `tiny-popover ${className}` }
				containerStyle={ contentStyle }
				content={ this.onRenderContent }
				isOpen={ !disabled && isOpen }
				positions={ placement || ['bottom', 'top'] }
				transitionDuration={ transitionDuration || 0.01 }
			>
				<div
					className='tiny-popover-anchor'
					onClick={ !disabled ? this.onTriggerEngaged : undefined }
					onMouseDown={ !disabled ? this.onTriggerEngaged : undefined }
					onMouseOut={ !disabled && engageOnHover ? this.onTriggerEngaged : undefined }
					onMouseOver={ !disabled && engageOnHover ? this.onTriggerEngaged : undefined }
					onTouchStart={ !disabled ? this.onTriggerEngaged : undefined }
				>
					{ anchor }
				</div>
			</ReactTinyPopover>
		);
	}

	private onTriggerEngaged = (e?: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
		this.stopPropagation(e);
		window.removeEventListener('select-close', this.onOuterAction);
		const event = new CustomEvent('select-close');
		window.dispatchEvent(event);
		window.addEventListener('select-close', this.onOuterAction);
	}

	private onOuterAction = () => {
		if (this.state.isOpen) {
			const { onRequestClose } = this.props;
			onRequestClose?.();

			if (!onRequestClose) {
				this.setState({ isOpen: false });
			}
		}
	}

	private onRenderContent = ({ position, childRect, popoverRect }: IArrowRenderer) => {
		const { arrow, children, arrowSize } = this.props;
		const { arrowColor, containerClassName } = this.state;

		return (
			<ArrowContainer
				arrowColor={ arrowColor || 'white' }
				arrowSize={ arrowSize ?? 0 }
				arrowStyle={ { display: 'none' } }
				childRect={ childRect }
				className='tiny-popover-arrow'
				popoverRect={ popoverRect }
				position={ position }
				{ ...(arrow || {}) }
			>
				<ReactTinyPopoverContent
					className={ `tiny-popover-content ${containerClassName}` }
					onClick={ this.stopPropagation }
					onMouseDown={ this.stopPropagation }
					onTouchStart={ this.stopPropagation }
				>
					{ children }
				</ReactTinyPopoverContent>
			</ArrowContainer>
		);
	}

	private stopPropagation = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
		e.stopPropagation();
	}

	private stopWatchingForOutsideAction = () => {
		window.removeEventListener('mousedown', this.onOuterAction);
		window.removeEventListener('touchstart', this.onOuterAction);
		window.removeEventListener('resize', debounce(this.onOuterAction, 25));
	}

	private watchForOutsideAction = () => {
		/**
		 * react-tiny-popover's default outside action tracking is
		 * insufficient. adding this to ensure that popover is dismissed
		 * as expected (similar to how old react-popover was tracking this)
		 */
		window.addEventListener('mousedown', this.onOuterAction);
		window.addEventListener('touchstart', this.onOuterAction);
		window.addEventListener('resize', debounce(this.onOuterAction, 25));
	}
}
