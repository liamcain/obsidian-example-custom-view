import { App, ItemView, WorkspaceLeaf } from "obsidian";
import CustomViewPlugin from './main';

export const EXAMPLE_VIEW_TYPE = 'example-view';

export default class ExampleView extends ItemView {
  constructor(
    readonly leaf: WorkspaceLeaf,
    readonly plugin: CustomViewPlugin
  ) {
    super(leaf);

    this.contentEl.createDiv({ text: 'Example view' });
  }

  getViewType(): string {
    return EXAMPLE_VIEW_TYPE;
  }

  getDisplayText(): string {
    return "Custom View";
  }

  getIcon(): string {
    return "graduation-cap";
  }
}
