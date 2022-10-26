/**
 *  产生ID
 * @param key
 * @returns
 */
export const guid = (key: string) => {
    return (
        'xxxxxx4xxyxxxxx'
            .replace(/[xy]/g, (c) => {
                const r = (Math.random() * 16) | 0;
                const v = c === 'x' ? r : (r & 0x3) | 0x8;
                return v.toString(16);
            })
            .toUpperCase() + key
    );
};
