# bazel-lab

Repository to test RBE .

## RBE

Remote build execution is done by engflow service. This repo has the necessary config for spawning actions in remote executors although only authenticated masmovil users can send actions to RBE. 

The RBE config has been added for illustrative pourposes.

## Failure scenario

Building `pkg_web` target rule with fails in RBE mode. Local sandboxed execution is successfull.


The output stack trace of the error is:

```
bazel-out/k8-.../external/build_bazel_rules_nodejs/internal/pkg_web/assembler.sh: line 236: /private/var/tmp/_bazel/.../external/nodejs_linux_amd64/bin/nodejs/bin/node: cannot execute binary file
```


## Repro steps

`bazel build //pkg/front/app:webapp --config=engflow-local` --> KO - Fails with `bin/nodejs/bin/node: cannot execute binary file`

`bazel build //pkg/front/app:webapp` --> OK - Produce the expected outputs 
