import ITodo from '../interfaces';

export const saveToStorage = (keyName: string, keyValue: ITodo[]): void => {
    localStorage.setItem(keyName, JSON.stringify(keyValue))
}

export const getFromStorage  = (keyName: string) : ITodo[] | null => {
    const jsonData = localStorage.getItem(keyName);

    if(!jsonData) return null;

    return JSON.parse(jsonData);
}