import {
  Competency,
  decodeCompetencyList,
  decodeCompetency,
  encodeCompetencyList,
  encodeCompetency,
  CompetencyList,
} from "./competencies";

test("Encoding", () => {
  expect(encodeCompetency({ category: "Design" })).toBe("Design");
  expect(encodeCompetency({ category: "Design", skill: "graphic" })).toBe(
    "Design / graphic"
  );
  expect(
    encodeCompetency({ category: "Design", skill: "graphic", level: "senior" })
  ).toBe("Design / graphic / senior");
  expect(
    encodeCompetencyList([
      { category: "Design" },
      { category: "Dev", skill: "Java" },
      { category: "Dev", skill: "Python", level: "junior" },
    ])
  ).toBe("Design; Dev / Java; Dev / Python / junior");
});

test("Decoding", () => {
  // Basic happy cases
  expect(decodeCompetency("Design")).toEqual<Competency>({
    category: "Design",
  });
  expect(decodeCompetency("Design/mobile")).toEqual<Competency>({
    category: "Design",
    skill: "mobile",
  });
  expect(decodeCompetency("Design/mobile/senior")).toEqual<Competency>({
    category: "Design",
    skill: "mobile",
    level: "senior",
  });

  // Error handling
  expect(() => decodeCompetency("")).toThrow();
  expect(() => decodeCompetency("Design/mobile/hero")).toThrow();
  expect(() => decodeCompetency("Design/mobile/senior/best")).toThrow();

  // Multiples
  expect(decodeCompetencyList("Design; Dev / Java")).toEqual<CompetencyList>([
    { category: "Design" },
    { category: "Dev", skill: "Java" },
  ]);

  // Roundtrip
  expect(encodeCompetencyList(decodeCompetencyList("Design; Dev / Java"))).toBe(
    "Design; Dev / Java"
  );
});
