import ts from "typescript";
import { readFileSync } from "fs";

export function delint(sourceFile: ts.SourceFile) {
    delintNode(sourceFile);

    function delintNode(node: ts.Node) {
        console.log(`node.kind = ${node.kind} and SyntaxKind is ${ts.SyntaxKind[node.kind]}`);
        // ts.forEachChild(node, delint)
    }
}
const fileNames: string[] = ['src/alarm.ts'];
fileNames.forEach(fileName => {
    // Parse a file
    const sourceFile = ts.createSourceFile(
        fileName,
        readFileSync(fileName).toString(),
        ts.ScriptTarget.ES2015 ,
      /*setParentNodes */ true
    );

    // delint it
    delint(sourceFile);
});
module.exports = { delint }