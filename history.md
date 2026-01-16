
## [2026/1/16 23:22:37] Command Content

```
gemini cliの拡張コマンドで使用する内部用のCLIコマンド autolog-gemini-cli をTypeScriptで実装したい。
あるプロジェクトにおいてgemini cliで /cmd と入力することにより、.gemini/commands/cmd.toml を実行するようにする。
cmd.toml の内部では、プロンプトとしては @cmd を発行することで、ファイル `cmd` の内容を指定する。
そして、ファイル `cmd` の内容を、カレントディレクトリの history.md に追記していくようにする。
この追記を行うためのプログラムが autolog-gemini-cli である。
サンプルの .gemini/commands/cmd.toml も用意してほしい。
この仕組みが不可能であれば指摘してほしい。

```

---
