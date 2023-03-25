export type CsvLine = string[];
export type CsvLines = CsvLine[];
export type CsvWriteLine = (values: CsvLine) => void;
export type CsvGenerateLines = (writeLine: CsvWriteLine) => void;

const CsvSeparator = ",";
const NewLine = "\n";

function buildCsvLine(values: CsvLine): string {
    return values.join(CsvSeparator) + NewLine;
}

export function buildCsvContent(
    head: CsvLine,
    lines: CsvLines | CsvGenerateLines
): string {
    let content = ''
    content += buildCsvLine(head)

    const writeLine = function (line: CsvLine) {
        if (line.length !== head.length) {
            throw new Error('Invalid count of a row values. The length must be same as head to be a valid CSV.')
        }

        content += buildCsvLine(line)
    }

    if (typeof lines === 'function') {
        lines(writeLine)
    } else {
        for (const line of lines) {
            writeLine(line)
        }
    }

    return content
}

