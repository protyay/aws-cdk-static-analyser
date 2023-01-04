import ts from "typescript";
import { readFileSync } from "fs";

export function delint(sourceFile: ts.SourceFile) {
    function delintNode(node: ts.Node) {
        if(ts.isVariableDeclaration)
        console.log(`node.kind = ${node.kind} and SyntaxKind is ${ts.SyntaxKind[node.kind]} and node.type is ${node.getText}`);
        ts.forEachChild(node, delint)
    }
}
const fileNames: string[] = ['src/alarm.ts'];
const tsProgram = ts.createProgram(fileNames, ts.getDefaultCompilerOptions());
const checker = tsProgram.getTypeChecker();

// Get the source file infor to walk the AST
const sourceFile :ts.SourceFile = tsProgram.getSourceFile(fileNames[0]);
function visitNodes(
    node: ts.Node, sourceFile: ts.SourceFile
) {
    if (node.kind === ts.SyntaxKind.VariableDeclaration)  {
        const nodeText = node.getText(sourceFile);
        const type = checker.getTypeAtLocation(node);
        const typeName = checker.typeToString(type, node);

        console.log(nodeText);
        console.log(`Type is (${typeName})`);
    }

    node.forEachChild(child =>
        visitNodes(child, sourceFile)
    );
}
visitNodes(sourceFile, sourceFile);
//TODO: For each lambda function , display what are the metrics being emitted.
// Also, list all the alarms and their configurations being configured on these metrics.
module.exports = { delint }