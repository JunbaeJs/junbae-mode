import * as vscode from 'vscode';

const configurationSection = ['enabled'] as const;
type ConfigurationSection = (typeof configurationSection)[number];

export class JunbaeMode {
  // configurations
  enabled: boolean = true;

  /**
   * Enables or disables Junbae Mode
   * @param enabled
   */
  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    this.updateConfig('enabled', this.enabled);
    vscode.window.showInformationMessage(`Junbae Mode is ${this.enabled ? 'enabled' : 'disabled'}!🦜`);
  }

  /**
   * Initializes Junbae Mode Configuration
   */
  init() {
    this.setEnabled(true);
    this.updateConfig('enabled', this.enabled);
  }

  /**
   * Updates the configuration
   * @param section
   * @param value
   */
  private updateConfig(section: ConfigurationSection, value: any) {
    const config = vscode.workspace.getConfiguration('junbae-mode');
    config.update(section, value, vscode.ConfigurationTarget.Global);
  }
}
