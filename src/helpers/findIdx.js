export default (item, arr) => {
    return Object.keys(item).includes('_id')
        ? arr.findIndex((arrayItem) => item._id === arrayItem._id)
        : arr.findIndex((arrayItem) => item === arrayItem);
};