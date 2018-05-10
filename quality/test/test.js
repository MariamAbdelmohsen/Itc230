var expect = require("chai").expect;
var book = require("../books.js");

describe("Book module", () => {
    // { id: 1, title: "Harry Potter and the Sorceret\' s Stone", year: 1997 },

    // it("returns requested book", () => {
    //     var allresult = book.getAll;
    //     expect(allresult).to.have.all.keys;
    // });

    it("returns requested book", () => {
        var result = book.get(Number(1));
        expect(result).to.deep.equal({ id: 1, title: "Harry Potter and the Sorceret\' s Stone", year: 1997 });
    });

    it("fails W/ invalid book", () => {
        var result = book.get(Number(9));
        expect(result).to.be.undefined;
    });


    it("returns add new book ", () => {
        var addResult = book.add(Number(8), "Harry Potter Stone", 2007);
        expect(addResult).to.deep.include({ id: 8, title: "Harry Potter Stone", year: 2007 });
    })

    it("fails add new book because its already existed ", () => {
        var addResult = book.add(Number(8), "Harry Potter Stone", 2007);
        expect(addResult).to.equal;
    });

    it("returns deleted book ", () => {
        var deleteResult = book.delete(Number(2));
        expect(deleteResult).to.be.equal;
    })

    it("fails delete book because its Not existed ", () => {
        var deleteResult = book.delete(Number(2));
        expect(deleteResult).to.equal;
    });



})