import { WraithnetApiWebServiceHelper } from "../lib/webServiceHelpers/wraithnetApiWebServiceHelper";

export class BaseModel {
  protected _webServiceHelper: WraithnetApiWebServiceHelper = null;

  get webServiceHelper() {
    if (!this._webServiceHelper) {
      // only want to instantiate object when used...
      this._webServiceHelper = new WraithnetApiWebServiceHelper();
    }
    
    return this._webServiceHelper;
  }

  protected composeUrl = (path: string) => {
    if (path.includes('/auth')) {
      return path;
    }
        
    return `/api/v1${path}`;
  }
}