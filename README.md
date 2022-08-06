Nuke files during UI5 build process
===

> _Ahhh... much better._

Normally you exclude resources files from build process with [`resources\excludes` rule][ui5_builder_exclude_resources], but that applies to your own project files, not the ones generated by build process itself.

This task let you tell builder which files it should not write to output directory on build. It should be the last task processed on build chain.

**Parental advisory**: misconfiguration can lead to broken UI5 builds (ie.: runtime errors when you deploy the resulting project). Use it at your own discretion.

Configuration options
---

- nukes: a glob `string` or an array of glob `strings` to identify files that should be nuked from output directory.

The glob expressions accepted are the same ones that `@ui5/fs.DuplexCollection.byGlob` accepts.
It relies on implementation that UI5 builder uses for glob handling.

Usage
---

1. Add it to your project development dependencies (either manually or through package managers) and also on ui5 dependencies on `package.json`.
```json
"devDependencies": {
  "@thalesvb/ui5-task-nuke": "<version>"
},
"ui5": {
  "dependencies": [
    "@thalesvb/ui5-task-nuke"
  ]
}
```

2. Configure it on your `ui5.yaml` under `builder \ customTasks` section.
The task is named `thalesvb/nuke`.

Example
---

A `Component-preload.js` only build would likely be achieved by:

```yaml
builder:
  customTasks:
    - name: thalesvb/nuke
      afterTask: generateVersionInfo
      configuration:
        nukes:
          - "**/*.properties"
          - "**/*.xml"
          - "**/*.js"
          - "!**/Component-preload.js"
```


[ui5_builder_exclude_resources]: https://sap.github.io/ui5-tooling/pages/Configuration/#exclude-resources