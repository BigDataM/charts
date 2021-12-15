export const GetDataKey = (responseData) => {
    let data = responseData;
    let newData = [];

    for (let i = 0; i < data.length; i++) {
        let newObject = {
            date: data[i].date,
            ["count" + data[i].tag]: data[i].count,
            tag: data[i].tag
        }
        newData.push(newObject);
    }
    return newData;
}