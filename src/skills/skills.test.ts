import {
  addSkill,
  decodeSkill,
  decodeSkillSelection,
  encodeSkill,
  encodeSkillSelection,
  skillsToHashtags,
  type Skill,
  type SkillSelection,
} from "./skills";

test("Encode single skill", () => {
  expect(encodeSkill({ category: "Marketing" })).toBe("Marketing");
  expect(encodeSkill({ category: "Marketing", name: "Copywriting" })).toBe(
    "Marketing / Copywriting",
  );
  expect(
    encodeSkill({
      category: "Marketing",
      name: "Copywriting",
      level: "senior",
    }),
  ).toBe("Marketing / Copywriting / senior");
});

test("Encode skill selection", () => {
  expect(
    encodeSkillSelection({
      Design: {},
      Dev: { Java: null, Python: "junior" },
    }),
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
    decodeSkill("Marketing / Copywriting / senior / best"),
  ).toThrow();
});

test("Basic skill selection decode", () => {
  // Decode empty
  expect(decodeSkillSelection("")).toEqual({});
  // Multiples
  expect(decodeSkillSelection("Design; Dev / Java")).toEqual<SkillSelection>({
    Design: {},
    Dev: { Java: null },
  });
  // Slashes
  expect(
    decodeSkillSelection("Vývoj / Docker/Kubernetes / junior"),
  ).toEqual<SkillSelection>({
    Vývoj: {
      "Docker/Kubernetes": "junior",
    },
  });
  // Roundtrip
  expect(encodeSkillSelection(decodeSkillSelection("Design; Dev / Java"))).toBe(
    "Design; Dev / Java",
  );
});

test("Adding skills", () => {
  const addTo = (selection: string, skill: string) =>
    encodeSkillSelection(
      addSkill(decodeSkillSelection(selection), decodeSkill(skill)),
    );
  // Adding to empty selection
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
    "Dev / Go / mentor",
  );
});

test("Convert skills to hashtags", () => {
  expect(skillsToHashtags("")).toBe("");
  expect(
    skillsToHashtags(
      "Marketing / Marketingová strategie / medior; Marketing / Analýza marketingových dat / medior",
    ),
  ).toBe("marketing; marketingová strategie");
  expect(
    skillsToHashtags(
      "Vývoj / Backend; Vývoj / Cloud (Azure, AWS, GCP); Vývoj / DevOps; Vývoj / Frontend; Vývoj / HTML & CSS; Vývoj / JavaScript + TypeScript; Vývoj / Mobilní aplikace (Android, iOS, Flutter, …); Vývoj / Node.js; Vývoj / React; Marketing / Copywriting",
    ),
  ).toBe(
    "backend; copywriting; DevOps/cloud; frontend; HTML/CSS; JavaScript/TypeScript; marketing; mobilní vývoj; React",
  );
  expect(
    skillsToHashtags(
      "Design / UX design / medior; Marketing; Vývoj / React / junior",
    ),
  ).toBe("design UX/UI; marketing; React");
  expect(
    skillsToHashtags(
      "Vývoj / Docker a Kubernetes / medior; Vývoj / HTML & CSS / medior; Vývoj / Python / senior; Vývoj / React / senior; Vývoj / Testování / medior; Vývoj / JavaScript + TypeScript / medior; Vývoj / Node.js / junior",
    ),
  ).toBe(
    "backend; DevOps/cloud; HTML/CSS; JavaScript/TypeScript; React; testování",
  );
  expect(
    skillsToHashtags(
      "Marketing / Analýza marketingových dat / senior; Projektové řízení / Business model a development / medior",
    ),
  ).toBe("marketing; projektové řízení");
  expect(
    skillsToHashtags(
      "Ostatní; Projektové řízení / Business model a development / medior; Design / Research / senior",
    ),
  ).toBe("projektové řízení");
});
