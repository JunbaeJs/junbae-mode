import * as vscode from 'vscode';
import { TextEditorDecorationType } from 'vscode';
import { Mode } from './mode.interface';
import { objectToCssString } from '../../utils';

const motions = [
  'data:image/png;base64,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',
  'data:image/png;base64,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',
  'data:image/png;base64,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',
  'data:image/png;base64,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',
];

type Location = {
  range: vscode.Range;
  junbaeLocation: { 'font-size': string } & XOR<{ top: string }, { bottom: string }>;
  timerLocation: XOR<{ top: string }, { bottom: string }>;
};

type TimerColor = {
  timerColor: string;
  timerShadowColor: string;
};

export class WalkMode implements Mode {
  private combo = 0;

  private enabled = false;

  private renderedComboCount?: number = undefined;

  private renderedRange?: vscode.Range = undefined;

  private walkDecoration?: TextEditorDecorationType;

  private decorationTimer?: NodeJS.Timeout;

  private timerDecorator?: vscode.TextEditorDecorationType;

  private timerDuration = 0;

  private expiredAt = 0;

  constructor() {
    this.enabled = vscode.workspace.getConfiguration('junbae-mode').get('Mode') === 'Walk';
    vscode.window.onDidChangeTextEditorVisibleRanges((e) => {
      this.updateDecorations(e.textEditor);
    });
  }

  onDidChangeTextDocument(event: vscode.TextDocumentChangeEvent): void {
    if (!this.enabled) {
      return;
    }
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return;
    }

    this.timerDuration = 5 * 1000;
    this.expiredAt = new Date().getTime() + this.timerDuration;
    this.updateDecorations(editor);
    this.combo += 1;
  }

  private updateDecorations(editor: vscode.TextEditor) {
    if (!this.enabled) {
      return;
    }
    const firstVisibleRange = editor.visibleRanges.find((range) => !range.isEmpty);

    if (!firstVisibleRange) {
      return;
    }

    const { junbaeLocation, timerLocation, range } = this.getLocation(firstVisibleRange);

    if (this.combo !== this.renderedComboCount || !range.isEqual(this.renderedRange!)) {
      this.renderedComboCount = this.combo;
      this.renderedRange = range;
      this.createWalkMotionDecorator([range], editor, junbaeLocation);
      this.createTimerDecoration([range], editor, timerLocation);
    }
  }

  private createWalkMotionDecorator = (
    ranges: vscode.Range[],
    editor: vscode.TextEditor,
    junbaeLocation: Location['junbaeLocation'],
  ) => {
    const timeLeft = this.expiredAt - new Date().getTime();

    if (timeLeft <= 0) {
      this.dispose();
      return;
    }

    const decoration = vscode.window.createTextEditorDecorationType({
      after: {
        contentText: ``,
        margin: '0.5em 0 0 0',
        textDecoration: `none; ${objectToCssString({
          width: '50px',
          height: '50px',
          'background-size': 'contain',
          'background-repeat': 'no-repeat',
          'background-image': `url("${motions[this.combo % motions.length]}")`,
          position: 'absolute',
          /**
           * NOTE: Junbae go out of screen when horizontal scroll
           * If you want to limit position of Junbae, use `%`
           */
          right: '5vw',
          ...junbaeLocation,
          'z-index': 1,
          'pointer-events': 'none',
        })}`,
      },
      rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
    });
    this.walkDecoration?.dispose();
    this.walkDecoration = decoration;
    editor.setDecorations(this.walkDecoration, ranges);
  };

  dispose() {
    this.walkDecoration?.dispose();
    this.timerDecorator?.dispose();
    clearTimeout(this.decorationTimer);
  }

  private createTimerDecoration(
    ranges: vscode.Range[],
    editor: vscode.TextEditor,
    timerLocation: Location['timerLocation'],
  ) {
    if (this.decorationTimer) {
      clearTimeout(this.decorationTimer);
    }

    const updateComboTimerDecoration = () => {
      const timeLeft = this.expiredAt - new Date().getTime();

      if (timeLeft <= 0) {
        this.dispose();
        return;
      }

      const { timerColor, timerShadowColor } = this.getTimerColor();

      const timerWidth = (timeLeft / this.timerDuration) * 4;
      const decoration = vscode.window.createTextEditorDecorationType({
        before: {
          contentText: '',
          backgroundColor: `${timerColor}`,
          width: `${timerWidth}em`,
          height: '8px',
          margin: '0.25em 0 0 0',
          textDecoration: `none; ${objectToCssString({
            'box-shadow': `0px 0px 15px ${timerShadowColor}`,
            position: 'absolute',
            /**
             * NOTE: Junbae go out of screen when horizontal scroll
             * If you want to limit position of Junbae, use `%`
             */
            right: '5vw',
            ...timerLocation,
            'z-index': 1,
            'pointer-events': 'none',
          })}`,
        },
        rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,
      });
      this.timerDecorator?.dispose();
      this.timerDecorator = decoration;

      editor.setDecorations(this.timerDecorator, ranges);
    };

    this.decorationTimer = setInterval(updateComboTimerDecoration, 50);
  }

  private getLocation(firstVisibleRange: vscode.Range): Location {
    const location = vscode.workspace.getConfiguration('junbae-mode').get('location');

    switch (location) {
      case 'bottom':
        return {
          range: new vscode.Range(firstVisibleRange.end, firstVisibleRange.end),
          junbaeLocation: { 'font-size': '100px', bottom: '10px' },
          timerLocation: { bottom: '70px' },
        };
      default:
        return {
          range: new vscode.Range(firstVisibleRange.start, firstVisibleRange.start),
          junbaeLocation: { top: '5%', 'font-size': '50px' },
          timerLocation: { top: '5%' },
        };
    }
  }

  private getTimerColor(): TimerColor {
    const timerColorName = vscode.workspace.getConfiguration('junbae-mode').get('timerColor');

    switch (timerColorName) {
      case 'red':
        return {
          timerColor: '#C54B65',
          timerShadowColor: '#FFC0CB',
        };
      default:
        return {
          timerColor: 'white',
          timerShadowColor: '#015dee',
        };
    }
  }
}
