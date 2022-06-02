workspace(
    name = "bazel_esbuild_lab",
)

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

http_archive(
    name = "io_bazel_rules_go",
    sha256 = "d6b2513456fe2229811da7eb67a444be7785f5323c6708b38d851d2b51e54d83",
    urls = [
        "https://mirror.bazel.build/github.com/bazelbuild/rules_go/releases/download/v0.30.0/rules_go-v0.30.0.zip",
        "https://github.com/bazelbuild/rules_go/releases/download/v0.30.0/rules_go-v0.30.0.zip",
    ],
)

http_archive(
    name = "bazel_gazelle",
    sha256 = "de69a09dc70417580aabf20a28619bb3ef60d038470c7cf8442fafcf627c21cb",
    urls = [
        "https://mirror.bazel.build/github.com/bazelbuild/bazel-gazelle/releases/download/v0.24.0/bazel-gazelle-v0.24.0.tar.gz",
        "https://github.com/bazelbuild/bazel-gazelle/releases/download/v0.24.0/bazel-gazelle-v0.24.0.tar.gz",
    ],
)

load("@io_bazel_rules_go//go:deps.bzl", "go_download_sdk", "go_register_toolchains", "go_rules_dependencies")

GO_SDK_VERSION = "1.17.1"
go_download_sdk(
    name = "go_sdk_linux",
    goos = "linux",
    goarch = "amd64",
    version = GO_SDK_VERSION
)

go_download_sdk(
    name = "go_sdk_darwin",
    goos = "darwin",
    goarch = "amd64",
    version = GO_SDK_VERSION
)

go_download_sdk(
    name = "go_sdk_darwin_arm64",
    goos = "darwin",
    goarch = "arm64",
    version = GO_SDK_VERSION
)



go_rules_dependencies()
go_register_toolchains()

load("@bazel_gazelle//:deps.bzl", "gazelle_dependencies", "go_repository")

# gazelle:repository_macro go_repositories.bzl%go_repositories

gazelle_dependencies()


local_repository(
    name = "rbe_default",
    path = "configs/rbe_default",
)


http_archive(
    name = "bazel_skylib",
    sha256 = "97e70364e9249702246c0e9444bccdc4b847bed1eb03c5a3ece4f83dfe6abc44",
    urls = [
        "https://mirror.bazel.build/github.com/bazelbuild/bazel-skylib/releases/download/1.0.2/bazel-skylib-1.0.2.tar.gz",
        "https://github.com/bazelbuild/bazel-skylib/releases/download/1.0.2/bazel-skylib-1.0.2.tar.gz",
    ],
)

http_archive(
    name = "build_bazel_rules_nodejs",
    sha256 = "0fad45a9bda7dc1990c47b002fd64f55041ea751fafc00cd34efb96107675778",
    urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/5.5.0/rules_nodejs-5.5.0.tar.gz"],
)

load("@build_bazel_rules_nodejs//:repositories.bzl", "build_bazel_rules_nodejs_dependencies")

build_bazel_rules_nodejs_dependencies()

load("@build_bazel_rules_nodejs//:index.bzl", "yarn_install")

yarn_install(
    # Name this npm so that Bazel Label references look like @npm//package
    name = "npm",
    package_json = "//pkg/front/app:package.json",
    exports_directories_only = False,
    yarn_lock = "//pkg/front/app:yarn.lock"
)

http_archive(
    name = "aspect_rules_swc",
    sha256 = "422126a732de2a858eb29ee24df6da29964bdd93c8b141e2f83a5119adf36686",
    strip_prefix = "rules_swc-0.5.1",
    url = "https://github.com/aspect-build/rules_swc/archive/refs/tags/v0.5.1.tar.gz",
)

###################
# rules_swc setup #
###################

# Fetches the rules_swc dependencies.
# If you want to have a different version of some dependency,
# you should fetch it *before* calling this.
# Alternatively, you can skip calling this function, so long as you've
# already fetched all the dependencies.
load("@aspect_rules_swc//swc:dependencies.bzl", "rules_swc_dependencies")

rules_swc_dependencies()

# Fetches a pre-built Rust-node binding from
# https://github.com/swc-project/swc/releases.
# If you'd rather compile it from source, you can use rules_rust, fetch the project,
# then register the toolchain yourself. (Note, this is not yet documented)
# load("@aspect_rules_swc//swc:repositories.bzl", "LATEST_VERSION", "swc_register_toolchains")
load("@aspect_rules_swc//swc:repositories.bzl", "swc_register_toolchains")

swc_register_toolchains(
    name = "swc",
    swc_version = "v1.2.168",
)

load("@rules_nodejs//nodejs:repositories.bzl", "nodejs_register_toolchains")
nodejs_register_toolchains(
    name = "node16",
    node_version = "16.9.0",
)