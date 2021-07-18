import { WraithnetApiWebServiceHelper } from "../lib/webServiceHelpers/wraithnetApiWebServiceHelper";

export interface IBaseProps {}

export class Base {
    protected _webServiceHelper: WraithnetApiWebServiceHelper;

    get webServiceHelper() {
        if (!this._webServiceHelper) {
          // only want to instantiate object when used...
          this._webServiceHelper = new WraithnetApiWebServiceHelper();
          this._webServiceHelper.initClient();
        }
    
        return this._webServiceHelper;
    }
}