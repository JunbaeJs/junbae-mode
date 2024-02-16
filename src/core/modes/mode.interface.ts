import * as vscode from 'vscode';

export interface Mode {
  onDidChangeTextDocument(event: vscode.TextDocumentChangeEvent): void;

  dispose(): void;
}
