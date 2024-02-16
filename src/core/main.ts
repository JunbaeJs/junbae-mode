import * as vscode from 'vscode';
import type { Mode } from './modes/mode.interface';
import { WalkMode } from './modes/walk-mode';

const configurationSection = ['enabled'] as const;
type ConfigurationSection = (typeof configurationSection)[number];
export class JunbaeMode {
  // configurations
  enabled: boolean = true;

  modes: Mode[] = [];

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
    this.modes.push(new WalkMode());
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

  onDidChangeTextDocument = (event: vscode.TextDocumentChangeEvent) => {
    if (this.enabled) {
      this.modes.forEach((mode) => mode.onDidChangeTextDocument(event));
    }
  };

  /**
   * Reset when configuration changed
   */
  onDidChangeConfiguration = () => {
    this.reset();
  };

  private reset() {
    this.dispose();
    this.enabled = vscode.workspace.getConfiguration('junbae-mode').get('enabled')!;
  }

  private dispose() {
    this.modes.forEach((mode) => mode.dispose());
  }
}
