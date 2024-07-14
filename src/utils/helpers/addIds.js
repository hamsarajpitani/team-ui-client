import { v4 as uuidv4 } from 'uuid';

export const addIds = (items) => {
    return items.map(item => ({
        ...item,
        id: uuidv4(),
    }));
};
