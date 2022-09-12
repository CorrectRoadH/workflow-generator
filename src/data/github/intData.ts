import BlockStruct from "../BlockStruct";

export const githubComponentData = new Array<BlockStruct>(
  {
    title: "执行shell命令",
    argNum: 2,
    args: ["请输入名称", "执行内容"],
    argsTip: ["执行名", "执行内容:"],
    componentType: "block",
    code: `    
      - name: $replace0$
        run: |
          $replace1$`,
    childrenInstance: undefined,
    children: [],
  },
  {
    title: "yaml 基础",
    argNum: 2,
    args: ["请输入名称", "请输入名称"],
    argsTip: ["脚本名", "分支名:"],
    componentType: "other",
    code: `name: $replace0$

on:
  push:
    branches:
      - $replace1$

jobs:`,
    childrenInstance: undefined,
    children: [],
  },
  {
    title: "上传产物到aur",
    argNum: 1,
    args: [],
    argsTip: ["你的key:"],
    componentType: "container",
    code: `
  aur-publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
    `,
    childrenInstance: [
      {
        title: "上传到aur shell",
        argNum: 2,
        args: ["Publish AUR package", "<TAG>"],
        argsTip: ["任务名", "TAG"],
        componentType: "block",
        code: `    - name: $replace0$
          uses: KSXGitHub/github-actions-deploy-aur@$replace1$
          with:
            pkgname: my-awesome-package
            pkgbuild: ./PKGBUILD
            commit_username: \${{ secrets.AUR_USERNAME }}
            commit_email: \${{ secrets.AUR_EMAIL }}
            ssh_private_key: \${{ secrets.AUR_SSH_PRIVATE_KEY }}
            commit_message: Update AUR package
            ssh_keyscan_types: rsa,dsa,ecdsa,ed25519`,
        childrenInstance: undefined,
        children: [],
      },
    ],
    children: [],
  },
  {
    title: "到github res",
    argNum: 1,
    args: [],
    argsTip: ["你的key:"],
    componentType: "Stage",
    code: `
  release:
    runs-on: ubuntu-latest
    steps:
    - name: Create Draft Release
    id: create_release
    uses: actions/create-release@v1
    env:
        GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
    with:
        tag_name: <tofill>
        release_name: <tofill>
        draft: true
        prerelease: false

    - uses: actions/upload-release-asset@v1.0.1
    env:
        GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
    with:
        upload_url: \${{ steps.create_release.outputs.upload_url }}
        asset_path: ./my-artifact.zip
        asset_name: my-artifact.zip
        asset_content_type: application/zip

    - uses: eregon/publish-release@v1
    env:
        GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
    with:
        release_id: \${{ steps.create_release.outputs.id }}
    `,
    childrenInstance: undefined,
    children: [],
  },
  {
    title: "阶段",
    argNum: 2,
    args: ["请输入", "请输入"],
    argsTip: ["阶段名:", "docker"],
    componentType: "container",
    code: `
  name: $replace0$
    runs-on: $replace1$
    steps:`,
    childrenInstance: undefined,
    children: [],
  },
  {
    title: "npm 编译",
    argNum: 0,
    args: [],
    argsTip: [],
    componentType: "Stage",
    code: `
  build:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [14.x, 16.x, 17.x, 18.x]

    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js \${{ matrix.node-version }}
      uses: actions/setup-node@v1
      with:
        node-version: \${{ matrix.node-version }}
    - run: npm install -g yarn
    - run: yarn
    - run: yarn test
    - run: yarn dist
    `,
    childrenInstance: undefined,

    children: [],
  }
);

export const gitlabComponent = [];
