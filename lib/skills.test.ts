import { decodeFields, decodeSkill, Field, Skill } from "./skills";

test("Decode single skill", () => {
  expect(
    decodeSkill({
      "id": "recBjBjSD1Dv6ZddQ",
      "Field": "Business",
      "Subfield": "development",
      "Top-level1": "Business dev",
      "Top-level": "Business dev",
      "Skill": "Business / development",
      "Top-level string": "Business dev",
    })
  ).toEqual<Skill>({
    id: "recBjBjSD1Dv6ZddQ",
    field: "Business",
    name: "development",
  });
});

test("Decode fields", () => {
  expect(
    decodeFields([
      {
        "id": "recBjBjSD1Dv6ZddQ",
        "Field": "Business",
        "Subfield": "development",
        "Top-level1": "Business dev",
        "Top-level": "Business dev",
        "Skill": "Business / development",
        "Top-level string": "Business dev",
      },
      {
        "id": "recBjBjSD1Dv6ZddP",
        "Field": "Business",
        "Subfield": "harm",
        "Top-level1": "Business dev",
        "Top-level": "Business dev",
        "Skill": "Business / harm",
        "Top-level string": "Business dev",
      },
      {
        "id": "recBjBjSD1Dv6ZddL",
        "Field": "Business",
        "Subfield": "_mentor",
        "Top-level1": "Business dev",
        "Top-level": "Business dev",
        "Skill": "Business / _mentor",
        "Top-level string": "Business dev",
      },
      {
        "id": "recBjBjSD1Dv6ZddM",
        "Field": "Business",
        "Subfield": "_senior",
        "Top-level1": "Business dev",
        "Top-level": "Business dev",
        "Skill": "Business / _senior",
        "Top-level string": "Business dev",
      },
    ])
  ).toEqual<Field[]>([
    {
      name: "Business",
      mentorSkillId: "recBjBjSD1Dv6ZddL",
      seniorSkillId: "recBjBjSD1Dv6ZddM",
      skills: [
        {
          id: "recBjBjSD1Dv6ZddQ",
          field: "Business",
          name: "development",
        },
        {
          id: "recBjBjSD1Dv6ZddP",
          field: "Business",
          name: "harm",
        },
      ],
    },
  ]);
});
