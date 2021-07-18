import { WraithnetApiWebServiceHelperNode } from "../lib/webServiceHelpers/wraithnetApiWebServiceHelperNode";

export interface IBaseProps {}

export class Base {
    protected _webServiceHelper: WraithnetApiWebServiceHelperNode;

    get webServiceHelper() {
        if (!this._webServiceHelper) {
          // only want to instantiate object when used...
          this._webServiceHelper = new WraithnetApiWebServiceHelperNode();
          this._webServiceHelper.initClient();
        }
    
        return this._webServiceHelper;
    }
}