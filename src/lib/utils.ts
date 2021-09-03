import dayjs from "dayjs";

export const getKeyTarService = () => {
    return process.env.NODE_ENV === 'production'
        ? 'wraithnet'
        : 'wraithnet-dev';
};

export const noop = () => {};