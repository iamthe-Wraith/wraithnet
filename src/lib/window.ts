import electron, { BrowserWindow, screen } from 'electron';
import {
  ICoords,
  IWindow,
  IWindowProps,
  IWindowSize,
} from '../types';

/**
 * TODO - add data passing to newly created window
 */

export default class Window implements IWindow {
  private _coords: ICoords;
  private _display: electron.Display;
  private filename: string;
  private _onClose = (): void => {};
  private _onClosed = (): void => {};
  private _window: electron.BrowserWindow;
  private _windowSize: IWindowSize;

  constructor(props: IWindowProps, showDevTools?: boolean) {
    const {
      display = 'cursor',
      frame = false,
      x = 'center',
      y = 'center',
      width = 'full',
      height = 'full',
      backgroundColor = '#000',
      filename = '',
      // data = {},
      resizable = true,
      onClose = () => {},
      onClosed = () => {},
    } = props;

    this._onClose = onClose;
    this._onClosed = onClosed;

    this._display = this._getDisplay(display, screen);
    this._windowSize = this._getWindowSize(width, height);
    this._coords = this._getCoords(x, y);
    this.filename = filename;

    if (this.filename !== '') {
      this._window = new BrowserWindow({
        backgroundColor,
        frame,
        x: this._coords.x,
        y: this._coords.y,
        width: this._windowSize.width,
        height: this._windowSize.height,
        webPreferences: {
          // nodeIntegration: true,
          worldSafeExecuteJavaScript: true,
        },
      });

      this._window.loadFile(this.filename);

      if (showDevTools) {
        this._window.webContents.openDevTools();
      }

      this._window.setResizable(resizable);
      this._window.on('close', this._onClose);
      this._window.on('closed', this._onClosed);
    } else {
      throw new Error('no filename found');
    }
  }

  /**
   * triggers the close event on this window.
   */
  public close() {
    this._window.close();
  }

  /**
   * triggers the focus event on this window
   */
  public focus() {
    this._window.focus();
  }

  /**
   * sends data from the main process to the remote
   *
   * @param {string} event - the name of the event to be
   * sent to remote
   * @param {Object} data - the data object to be sent
   */
  public send(name: string, data: any): void {
    this._window.webContents.send(name, data);
  }

  public render():void {
    if (this.filename) this._window.loadFile(this.filename);
  }

  /**
   * gets the x and y coordinates of the top left corner of the window.
   *
   * @param {number|string} x - the desired x coordinate of the top
   * left corner of the window. allowed values include: 'left', 'center',
   * 'right', or a numerical pixel value.
   * @param {number|string} y - the desired y coordinate of the top
   * left corner of the window. allowed values include: 'top', 'center',
   * 'bottom', or a numberical pixel value.
   * @returns {Object} - the window coordinate object with properties
   * x and y.
   */
  private _getCoords(x: number|string, y: number|string) {
    const cords = { x: 0, y: 0 };

    const xRegex = /left|center|right|\d/;
    const yRegex = /top|center|bottom|\d/;

    if (xRegex.test(x.toString()) && yRegex.test(y.toString())) {
      if (x === 'left') {
        cords.x = this._display.bounds.x + 10;
      } else if (x === 'center') {
        cords.x = this._display.bounds.x + (Math.floor(this._display.bounds.width / 2) - Math.floor(this._windowSize.width / 2));
      } else if (x === 'right') {
        cords.x = this._display.bounds.x + (this._display.bounds.width - 12) - this._windowSize.width;
      } else {
        if (x < 0) {
          cords.x = this._display.bounds.x;
        } else if (x > this._display.bounds.width) {
          cords.x = this._display.bounds.x + this._display.bounds.width;
        } else {
          cords.x = this._display.bounds.x + parseInt(x.toString(), 10);
        }
      }

      if (y === 'top') {
        cords.y = this._display.workArea.y;
      } else if (y === 'center') {
        cords.y = this._display.workArea.y + (Math.floor(this._display.workArea.height / 2) - Math.floor(this._windowSize.height / 2));
      } else if (y === 'bottom') {
        cords.y = this._display.workArea.y + (this._display.workArea.height - 10 - this._windowSize.height);
      } else {
        if (y < 0) {
          cords.y = this._display.workArea.y;
        } else if (y > this._display.workArea.height) {
          cords.y = this._display.workArea.y + this._display.workArea.height;
        } else {
          cords.y = this._display.workArea.y + parseInt(y.toString(), 10);
        }
      }

      return cords;
    }

    throw new Error(`invalid window coordinates found: { x: ${x}, y: ${y} }`);
  }

  /**
   * gets the display to show this window on
   *
   * @param {number|string} displayId - the ID of the
   * display. possible values include: 'primary', or the
   * numerical index of the display if is not the primary
   * display.
   * @returns {electron.Display} - the display to show the
   * window on.
   */
  private _getDisplay(displayId: number|string, _screen: electron.Screen) {
    if (displayId === 'cursor' || displayId === 'primary' || typeof displayId === 'number') {
      const unorderedDisplays = _screen;

      if (unorderedDisplays.getAllDisplays().length > 1) {
        const orderedDisplays = this._sortDisplays(unorderedDisplays);

        if (displayId === 'cursor') {
          return _screen.getDisplayNearestPoint(_screen.getCursorScreenPoint());
        }

        if (typeof displayId === 'number' && orderedDisplays[displayId]) {
          return orderedDisplays[displayId];
        }

        return unorderedDisplays.getPrimaryDisplay();
      }

      return unorderedDisplays.getPrimaryDisplay();
    }

    throw new Error(`invalid display found: ${displayId}`);
  }

  /**
   * gets the size of the window in pixels
   *
   * @param {number|string} width - the desired width of the
   * window. possible values include: 'full', or a specific
   * pixel value.
   * @param {number|string} height - the desired height of the
   * window. possible values include: 'full' or a specific
   * pixel value.
   * @returns {Object} - the window size object with properties
   * width and height.
   */
  private _getWindowSize(width: number|string, height: number|string) {
    if ((width === 'full' || typeof width === 'number') && (height === 'full' || typeof height === 'number')) {
      return {
        width: width === 'full' ? this._display.workArea.width : width,
        height: height === 'full' ? this._display.workArea.height : height,
      };
    }

    throw new Error(`invalid window size found: { width: ${width}, height: ${height}}`);
  }

  /**
   * sorts the available displays from left to right
   *
   * @param {electron.Screen} displays - all the available
   * displays, in no particular order.
   * @return {electron.Display[]} - returns an array of all
   * displays (minus the primary display) in order from left
   * to right by the x coordinate.
   */
  private _sortDisplays(displays: electron.Screen) {
    const primaryDisplay = displays.getPrimaryDisplay();

    return displays.getAllDisplays().reduce((result: electron.Display[], display: electron.Display) => {
      if (display.id !== primaryDisplay.id) {
        result.push(display);
      }

      return result;
    }, []).sort((x: electron.Display, y: electron.Display) => {
      if (x.bounds.x > y.bounds.x) {
        return -1;
      }

      if (x.bounds.x < y.bounds.x) {
        return 1;
      }

      return 0;
    });
  }
}
