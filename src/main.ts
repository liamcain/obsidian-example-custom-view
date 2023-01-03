import { Plugin, WorkspaceLeaf } from "obsidian";
import ExampleView, { EXAMPLE_VIEW_TYPE } from './view';


export default class CustomViewPlugin extends Plugin {
  onunload(): void {
    // Important: Do not detach leaves with your custom view in onunload. This is an antipattern that
    // can be disruptive to users especially when they are updating your plugin.
    //
    // When a plugin is updated, it is unloaded, the view type is unregistered, then the plugin is
    // reloaded and your views automatically get refreshed.
    //
    // If you detach the leaves before this can happen, the plugin will end up initializing
    // a new view in the default position that you specified (right or left sidebar) regardless of where
    // the previous instance of the view was.
  }

  async onload(): Promise<void> {
    this.registerView(
      EXAMPLE_VIEW_TYPE,
      (leaf: WorkspaceLeaf) => new ExampleView(leaf, this)
    );

    this.addCommand({
      id: "show-example-view",
      name: "Show example view",
      callback: () => {
        // If your plugin creates a custom view, it should include a 'show' command to reveal the leaf
        // in the sidebar as well as make view active.
        // 
        // The view should be active for accessibility. It allows users to focus your custom view entirely
        // via the keyboard.
        this.ensureLeafExists(true);
      },
    });

    this.app.workspace.onLayoutReady(() => {
      // Note: don't make the leaf active onload. This will affect the user's layout if the user boots up
      // Obsidian and they don't want your view to be the active sidebar tab.
      this.ensureLeafExists(false);
    });
  }

  ensureLeafExists(active: boolean = false): void {
    let { workspace } = this.app;

    let preferredSidebar = 'right'; // specify what sidebar you want your view to initially appear in

    let leaf: WorkspaceLeaf;
    let existingPluginLeaves = workspace.getLeavesOfType(EXAMPLE_VIEW_TYPE);

    // There's already an existing leaf with our view. Do nothing.
    if (existingPluginLeaves.length > 0) {
      leaf = existingPluginLeaves[0];
    }
    else {
      // View doesn't exist yet. Create it and make it visible
      leaf = preferredSidebar === 'left' ? workspace.getLeftLeaf(false) : workspace.getRightLeaf(false);
      workspace.revealLeaf(leaf);
      leaf.setViewState({ type: EXAMPLE_VIEW_TYPE });
    }

    if (active) {
      workspace.setActiveLeaf(leaf);
    }
  }
}
