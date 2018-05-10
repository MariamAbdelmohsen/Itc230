let books = [
    { id: 1, title: "Harry Potter and the Sorceret\' s Stone", year: 1997 },
    { id: 2, title: "Harry Potter and the Chamber of Secrets ", year: 1999 },
    { id: 3, title: "Harry Potter and the Prisoner of Azkaban", year: 2001 },
    { id: 5, title: "Harry Potter and the Goblet of Fire", year: 2002 },
    { id: 6, title: "Harry Potter and the Goblet ", year: 2003 },
    { id: 7, title: "Harry Potter and the  Fire", year: 2004 },
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
    return {
        id: id,
        deleted: oldLenght !== books.length,
        total: books.length
    };
};

exports.add = (newId, newTitle, newYear) => {
    let oldLenght = books.length;
    let found = this.get(newId.id, newTitle, newYear);
    if (!found) {
        books.push(newId, newTitle, newYear);
    }
    return {
        id: newId,
        title: newTitle,
        year: newYear,
        add: oldLenght !== books.length,
        total: books.length
    };
};