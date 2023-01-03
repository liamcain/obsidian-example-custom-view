This repo attempts to define the best practices when it comes to registering custom views in [Obsidian](https://obsidian.md).

This is a living document, as the best practices are subject to change, especially as the API continues to evolve.

## Goals

Plugins that create custom views should all behave the same way. Deterministic behavior is key to a good user experience.

- Custom views should behave identically to core Obsidian views.
- Custom views should respect the user's workspace and layout.

## Known issues

Updating a plugin creates a new leaf, even if the user intentionally closed the plugin view in their workspace.