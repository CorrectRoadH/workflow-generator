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
    children: [],
  },
  {
    title: "上传产物到aur",
    argNum: 1,
    args: [],
    argsTip: ["你的key:"],
    componentType: "Stage",
    code: `
  aur-publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Publish AUR package
        uses: KSXGitHub/github-actions-deploy-aur@<TAG>
        with:
          pkgname: my-awesome-package
          pkgbuild: ./PKGBUILD
          commit_username: \${{ secrets.AUR_USERNAME }}
          commit_email: \${{ secrets.AUR_EMAIL }}
          ssh_private_key: \${{ secrets.AUR_SSH_PRIVATE_KEY }}
          commit_message: Update AUR package
          ssh_keyscan_types: rsa,dsa,ecdsa,ed25519
    `,
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
    children: [],
  }
);

export const gitlabComponent = [];
