"""Macros for defining typescript/javascript targets"""

load("@build_bazel_rules_nodejs//:index.bzl", _js = "js_library")
load("@npm//@bazel/typescript:index.bzl", _ts_project = "ts_project", )
load("@aspect_rules_swc//swc:swc.bzl", "swc_transpiler")
load("@npm//typescript:index.bzl", _tsc_test = "tsc_test")
load("@bazel_skylib//rules:write_file.bzl", "write_file")

_DEPS = [
    "@npm//@types/react",
    "@npm//tslib",
]

def swc(name, **kwargs):
    """Pass swcrc to swc rule."""
    kwargs["swcrc"] = "//pkg/front/app:.swcrc"
    swc_transpiler(name = name, source_maps = "true", **kwargs)

def js_library(name, srcs, **kwargs):
    """Generate javascript targets. Adds flexibility for updating dependencies."""
    _js(name, srcs, **kwargs)

def ts_project(name, srcs, **kwargs):
    """Macro for generating typescript targets."""
    deps = kwargs.pop("deps", [])
    global_srcs_flag = kwargs.pop("no_wildcard", False)
    deps += _DEPS
    global_srcs = []

    data = kwargs.pop("data", [])

    _ts_project(
        name = name,
        transpiler = swc,
        # srcs = global_srcs + srcs,
        srcs = srcs,
        deps = deps,
        data = data,
        allow_js = True,
        declaration = True,
        preserve_jsx = True,
        composite = True,
        source_map = True,
        # declaration_map = True,
        # incremental = True,
        # tsconfig = "//pkg/front:tsconfig.base.json",
        tsconfig = "//pkg/front/app:tsconfig.json",
        **kwargs
    )