export class BaseModel {
    protected composeUrl = (path: string) => {
        if (path.includes('/auth')) {
            return path;
        }
        
        return `/api/v1/${path}`;
    }
}