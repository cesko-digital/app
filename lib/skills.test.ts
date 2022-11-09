import {
  addSkill,
  decodeSkill,
  decodeSkillTree,
  encodeSkill,
  encodeSkillTree,
  Skill,
  SkillTree,
  upgradeLegacySkills,
} from "./skills";

test("Encode single skill", () => {
  expect(encodeSkill({ category: "Marketing" })).toBe("Marketing");
  expect(encodeSkill({ category: "Marketing", name: "Copywriting" })).toBe(
    "Marketing / Copywriting"
  );
  expect(
    encodeSkill({ category: "Marketing", name: "Copywriting", level: "senior" })
  ).toBe("Marketing / Copywriting / senior");
});

test("Encode skill tree", () => {
  expect(
    encodeSkillTree({
      Design: [],
      Dev: [{ name: "Java" }, { name: "Python", level: "junior" }],
    })
  ).toBe("Design; Dev / Java; Dev / Python / junior");
});

test("Decode single skill", () => {
  // Basic happy cases
  expect(decodeSkill("Marketing")).toEqual<Skill>({
    category: "Marketing",
  });
  expect(decodeSkill("Marketing / Copywriting")).toEqual<Skill>({
    category: "Marketing",
    name: "Copywriting",
  });
  expect(decodeSkill("Marketing / Copywriting / senior")).toEqual<Skill>({
    category: "Marketing",
    name: "Copywriting",
    level: "senior",
  });

  // Error handling
  expect(() => decodeSkill("")).toThrow();
  expect(() => decodeSkill("Marketing / Copywriting / hero")).toThrow();
  expect(() =>
    decodeSkill("Marketing / Copywriting / senior / best")
  ).toThrow();
});

test("Basic skill tree decode", () => {
  // Decode empty
  expect(decodeSkillTree("")).toEqual({});
  // Multiples
  expect(decodeSkillTree("Design; Dev / Java")).toEqual<SkillTree>({
    Design: [],
    Dev: [{ name: "Java" }],
  });
  // Roundtrip
  expect(encodeSkillTree(decodeSkillTree("Design; Dev / Java"))).toBe(
    "Design; Dev / Java"
  );
});

test("Adding skills", () => {
  const addTo = (tree: string, skill: string) =>
    encodeSkillTree(addSkill(decodeSkillTree(tree), decodeSkill(skill)));
  // Adding to empty tree
  expect(addTo("", "Dev")).toBe("Dev");
  expect(addTo("", "Dev / Go")).toBe("Dev / Go");
  expect(addTo("", "Dev / Go / senior")).toBe("Dev / Go / senior");
  // Adding to existing empty category
  expect(addTo("Dev", "Dev / Go")).toBe("Dev / Go");
  expect(addTo("Dev", "Dev / Go / senior")).toBe("Dev / Go / senior");
  // Adding duplicates
  expect(addTo("Dev", "Dev")).toBe("Dev");
  expect(addTo("Dev / Go", "Dev / Go")).toBe("Dev / Go");
  expect(addTo("Dev / Go", "Dev / Go / senior")).toBe("Dev / Go / senior");
  expect(addTo("Dev / Go", "Dev")).toBe("Dev / Go");
  // Seniority update
  expect(addTo("Dev / Go", "Dev / Go / senior")).toBe("Dev / Go / senior");
  expect(addTo("Dev / Go / senior", "Dev / Go")).toBe("Dev / Go / senior");
  expect(addTo("Dev / Go / mentor", "Dev / Go / senior")).toBe(
    "Dev / Go / mentor"
  );
});

test("Upgrade", () => {
  const parseSkills = (input: string) =>
    input
      .split(/\s*;\s*/)
      .map((skill) => skill.split(/\s*\/\s*/))
      .map(([field, name]) => ({ field, name }));
  const upgrade = (skills: string) =>
    encodeSkillTree(upgradeLegacySkills(parseSkills(skills)));

  // Basic rename
  expect(upgrade("Vývoj / Java")).toBe("Vývoj / Java a Kotlin");

  // Leave out non-relevant skills
  expect(upgrade("Vývoj / Node.js; Vývoj / Scala")).toBe("Vývoj / Node.js");

  // Replace singleton non-relevant skills with general category
  expect(upgrade("Vývoj / Scala")).toBe("Vývoj");
  // …also when there’s another skill in that category, but it’s just a seniority flag
  expect(upgrade("Management / leadership; Management / senior")).toBe(
    "Projektové řízení"
  );
  // …also when all skills in category are obsolete
  expect(upgrade("Vývoj / automatizace; Vývoj / C++")).toBe("Vývoj");

  // Rename legacy category names
  expect(upgrade("Management / projektový")).toBe("Projektové řízení");
  // …also with seniority skills
  expect(upgrade("Management / senior")).toBe("Projektové řízení");

  // Seniority on category is just lost :(
  expect(upgrade("Vývoj / senior")).toBe("Vývoj");

  // Handle multiple seniority levels correctly
  expect(upgrade("Marketing / senior; Marketing / mentor")).toBe("Marketing");

  // Seniority on category with other skills moves to those skills
  expect(upgrade("Vývoj / senior; Vývoj / Python")).toBe(
    "Vývoj / Python / senior"
  );
  // …also with multiple skills
  expect(upgrade("Vývoj / senior; Vývoj / Python; Vývoj / Node.js")).toBe(
    "Vývoj / Python / senior; Vývoj / Node.js / senior"
  );
  // …also with renamed skills
  expect(upgrade("Vývoj / senior; Vývoj / Java")).toBe(
    "Vývoj / Java a Kotlin / senior"
  );
  expect(upgrade("Odborná veřejnost / senior")).toBe("");

  // Mentoring on category is just lost :(
  expect(upgrade("Vývoj / mentor")).toBe("Vývoj");

  // Mentoring on category with other skills moves to those skills
  expect(upgrade("Vývoj / mentor; Vývoj / Python")).toBe(
    "Vývoj / Python / mentor"
  );
  // …also with multiple skills
  expect(upgrade("Vývoj / mentor; Vývoj / Python; Vývoj / Node.js")).toBe(
    "Vývoj / Python / mentor; Vývoj / Node.js / mentor"
  );
  // …also with renamed skills
  expect(upgrade("Vývoj / mentor; Vývoj / Java")).toBe(
    "Vývoj / Java a Kotlin / mentor"
  );
  expect(upgrade("Odborná veřejnost / mentor")).toBe("");

  // Do not repeat categories
  expect(upgrade("Management / projektový; Marketing / management")).toBe(
    "Projektové řízení"
  );

  // Weird edge cases
  expect(upgrade("Management / marketingový")).toBe("Marketing");
});
