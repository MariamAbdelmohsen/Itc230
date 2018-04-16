let books = [
    { id: 1, title: "Harry Potter and the Sorceret\' s Stone", year: 1997 },
    { id: 2, title: "Harry Potter and the Chamber of Secrets ", year: 1999 },
    { id: 3, title: "Harry Potter and the Prisoner of Azkaban", year: 2001 },
    { id: 4, title: "Harry Potter and the Goblet of Fire", year: 2002 },
];
exports.getAll = () => {
    return books;
};

exports.get = (id) => {
    return books.find((item) => {
        return item.id === id;
    });
};
exports.delete = (id) => {
    const oldLenght = books.length;
    books = books.filter((item) => {
        return item.id !== id;
    });
    return { deleted: oldLenght !== books.length };
};

exports.add = (newId) => {
    const oldLenght = books.length;
    let found = this.get(newId.id);
    if (!found) {
        books.push(newId);
    }
    return {
        add: oldLenght !== books.length,
        total: books.length
    };
};