var expect = require("chai").expect;
var book = require("../books.js");

describe("Book module", () => {
    // { id: 1, title: "Harry Potter and the Sorceret\' s Stone", year: 1997 },

    it("returns requested book", () => {
        var result = book.get(Number(1));
        expect(result).to.deep.equal({ id: 1, title: "Harry Potter and the Sorceret\' s Stone", year: 1997 });
    });

    it("fails W/ invalid book", () => {
        var result = book.get(Number(5));
        expect(result).to.be.undefined;
    });

})