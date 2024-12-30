# 初始配置

在 Windows 系统下，可以通过配置 Git 来确保文件的换行符默认为 LF。你可以在终端中运行以下命令：
```
git config --global core.autocrlf input
```
这条命令会将 Git 配置为在提交时将 CRLF 转换为 LF，但在检出时不做任何转换。
