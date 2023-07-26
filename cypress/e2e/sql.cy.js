describe("connect to test db", () => {
  it("can connect to the db", () => {
    cy.task(
      "queryDb",
      "CREATE TABLE students (StudentId int, FirstName varchar(255), StudentGroup varchar(255))"
    );
  });

  it("input entries", () => {
    cy.task(
      "queryDb",
      `INSERT INTO students (StudentId, FirstName, StudentGroup) VALUES 
  (1, "Dmitrii", "2a"),
  (2, "Maria", "1a"),
  (3, "Roman", "2a");`
    ).then((result) => {
      cy.log(JSON.stringify(result));
      expect(result.affectedRows).to.equal(3);
    });
  });
  it("select test", () => {
    cy.task(
      "queryDb",
      `SELECT FirstName FROM students WHERE StudentGroup = "2a"`
    ).then((result) => {
      cy.log(JSON.stringify(result));
      expect(result[0].FirstName).to.equal("Dmitrii");
      expect(result[1].FirstName).to.equal("Roman");
    });
  });
  it("add new students", () => {
    cy.task(
      "queryDb",
      `INSERT INTO students (StudentId, FirstName, StudentGroup) VALUES 
      (4, "Andrey", "1a"),
      (5, "Ilya", "1a");`
    ).then((result) => {
      cy.log(JSON.stringify(result));
      expect(result.affectedRows).to.equal(2);
    });
  });

  it("select group", () => {
    cy.task("queryDb", `SELECT * FROM students WHERE StudentGroup = "1a"`).then(
      (result) => {
        cy.log(JSON.stringify(result));
        expect(result[0].FirstName).to.equal("Maria");
      }
    );
  });

  it("can delete the table", () => {
    cy.task("queryDb", "DROP TABLE students");
  });
});
