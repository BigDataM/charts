export const GetTag = (data) => {
    let tag = [];

    for (let i = 0; i < data.length; i++) {
        if (typeof data[i].tag === "undefined") {
            break;
        }
        tag.push({ "tag": data[i].tag})
    }

    let newTag = tag.filter((value, index, arr) => {
        return arr.findIndex(tag => JSON.stringify(tag) === JSON.stringify(value)) === index
    });

    return newTag
}