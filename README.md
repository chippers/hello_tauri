# hello_tauri

Absolute minimal hello world for [Tauri](https://github.com/tauri-apps/tauri).
This exists so that I can independently experiment with release binary size.

The following binaries have had been built with `--release` and have had 
`strip --strip-all` run on them.

| Configuration | Size (MiB) | Size (bytes) |
| ------------- | ---------- | ------------ |
| _stable_ | 3.1MiB | 3,162,136 |
| `build-std` | 2.8MiB | 2,859,032 |
| `build-std` + `build-std-features` | 2.5MiB | 2,539,544 |

---

`uname -a`:
* `Linux dev 5.12.5-arch1-1 #1 SMP PREEMPT Wed, 19 May 2021 10:32:40 +0000 x86_64 GNU/Linux`
* (btw)