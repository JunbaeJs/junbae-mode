// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { JunbaeMode } from './core';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  const mode = new JunbaeMode();
  mode.init();
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const enable = vscode.commands.registerCommand('junbae-mode.enable', () => mode.setEnabled(true));
  const disable = vscode.commands.registerCommand('junbae-mode.disable', () => mode.setEnabled(false));
  vscode.workspace.onDidChangeTextDocument(mode.onDidChangeTextDocument);

  context.subscriptions.push(enable);
  context.subscriptions.push(disable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
