import * as vscode from 'vscode';
import { Mode } from './modes/mode.interface';

const configurationSection = ['enabled'] as const;
type ConfigurationSection = (typeof configurationSection)[number];
export class JunbaeMode {
  // configurations
  enabled: boolean = vscode.workspace.getConfiguration('junbae-mode').get('enabled') ?? true;

  modes!: Mode[];

  /**
   * Enable or disable Junbae Mode
   * @param enabled
   */
  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    this.updateConfig('enabled', this.enabled);
    vscode.window.showInformationMessage(`Junbae Mode is ${this.enabled ? 'enabled' : 'disabled'}!🦜`);
  }

  /**
   * Initialize Junbae Mode Configurations
   */
  init() {
    this.setEnabled(true);
    this.updateConfig('enabled', this.enabled);
  }

  /**
   * Update the configuration
   * @param section
   * @param value
   */
  private updateConfig(section: ConfigurationSection, value: any) {
    const config = vscode.workspace.getConfiguration('junbae-mode');
    config.update(section, value, vscode.ConfigurationTarget.Global);
  }

  onDidChangeTextDocument(event: vscode.TextDocumentChangeEvent) {
    this.modes.forEach((mode) => mode.onDidChangeTextDocument(event));
  }
}
