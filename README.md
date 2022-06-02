# bazel-swc-lab

Repository to test RBE with `aspect-build/rules_swc`.

## RBE

Remote build execution is done by engflow service. This repo has the necessary config for spawning actions in remote executors although only authenticated masmovil users can send actions to RBE. 

The RBE config has been added for illustrative pourposes.

## Failure scenario

Building typescript srcs using `ts_project` rule with swc transpiler fails in RBE mode since swc version `0.5.0` (also tested with the latest release `v0.7.0`). Local sandboxed execution is successfull.

Prior to `v0.5.0`, swc RBE transpilation works just fine with the same config.

The output stack trace of the error is:

```
Error: Cannot find module 'slash'
Require stack:
- /var/lib/../exec/bazel-out/k8-opt-exec-EAxs2/bin/external/aspect_rules_swc/swc/node_modules/@swc/cli/lib/swc/dir.js
```


## Repro steps

`bazel build //pkg/front/app --config=engflow-local` swc >= v0.5.0 --> KO - Fails with `Error: Cannot find module 'slash'`
`bazel build //pkg/front/app` --> OK - Produce the expected outputs 
`bazel build //pkg/front/app --config=engflow-local` swc < v0.5.0 --> OK - Produce the expected outputs 
