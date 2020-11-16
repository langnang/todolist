const key = "todo";

export default {
    create: () => {
        window.localStorage.setItem(key, JSON.stringify([]));
    },
    drop: () => {
        window.localStorage.removeItem(key);
    },
    insert: () => {
    },
    delete: () => {
    },
    update: () => {
    },
    list: () => {
        return JSON.parse(window.localStorage.getItem(key));
    },
}