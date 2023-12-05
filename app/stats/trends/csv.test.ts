import {
  buildCsvContent,
  CsvGenerateLines,
  CsvLines,
  CsvWriteLine,
} from "./csv";

function assertWriteCsvOutputSuccess(
  lines: CsvLines | CsvGenerateLines,
  expectedOutput: string,
): void {
  const headers = ["label", "value-1", "value-3"];
  const output = buildCsvContent(headers, lines);

  expect(output).toEqual(`label,value-1,value-3\n${expectedOutput}`);
}

test("writeCsvOutput writes headers, headers line and supports static data", () => {
  assertWriteCsvOutputSuccess(
    [
      ["test", "2", "3"],
      ["test-2", "1", "0"],
    ],
    "test,2,3\ntest-2,1,0\n",
  );
});

test("writeCsvOutput writes headers, headers line and supports dynamic data", () => {
  assertWriteCsvOutputSuccess((writeLine: CsvWriteLine) => {
    writeLine(["test", "2", "3"]);
    writeLine(["test-2", "1", "0"]);
  }, "test,2,3\ntest-2,1,0\n");
});

function assertWriteCsvOutputError(lines: CsvLines | CsvGenerateLines): void {
  const t = () => {
    const headers = ["label", "value-1", "value-3"];
    buildCsvContent(headers, lines);
  };
  expect(t).toThrowError(
    "Invalid count of a row values. The length must be same as head to be a valid CSV.",
  );
}

test("writeCsvOutput raises error if line values count is not same as headers count", () => {
  assertWriteCsvOutputError([["test", "2"]]);
});

test("writeCsvOutput raises error if line values count is not same as headers count with dynamic data", () => {
  assertWriteCsvOutputError(function (writeLine: CsvWriteLine) {
    writeLine(["test", "2"]);
  });
});
