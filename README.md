# GH Docker Action cache repro

Repro for the long cache export GHA Docker issue

Related issue:

Some facts:

- Project based on monorepo from here: https://github.com/axeldelafosse/expo-next-monorepo-example
- It's a Next.js app with React Native Web
- The `turbo prune` command comes from [TurboRepo](https://turborepo.org/) and creates a `out/` dir with Docker-friendly file structure, more on this [in the docs](https://turborepo.org/docs/reference/command-line-reference#--docker)
- Original repo has some more stuff, but it's irrelevant here so pruned as much as possible
