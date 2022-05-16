<div align="center">
  <a href="" target="_blank">
    <img alt="stage logo" width="200" src="https://github.com/fujia-blogs/articles/blob/main/stage-ci/assets/stage.svg"/>
  </a>
</div>

<div align="center">
  <h1>@fujia/frontend-practice-template</h1>
</div>

<div align="center">

Talk is cheap, Show me the code.

</div>

## Getting started

At first, you can install the cli tools by following commands:

```sh
npm i -g @fujia/cli-core

# or using yarn
yarn global add @fujia/cli-core
```

then, to initial a project with the template via above cli tools:

```sh
# step1. create project folder
mkdir [project name]; cd $_;

# step2. initial project via the template
stage init

# step3. select "custom" option.

# step4. input the template info.

```

of course, if you don't want to install @fujia/cli-core in global scope, it can initial a project quickly by following commands:

```sh
# step1. create project folder
mkdir [project name]; cd $_;

# step2. initial project via the template
npm init stage@latest

# the other steps follow above.
```

That's all, the project will install the dependencies and devDependencies, then running automatically.

### Starting Development

1. Start the app in the dev environment:

```sh
npm run dev
```

## Maintainers

- [fujia](https://github.com/fushenguang)

## License

MIT © [frontend-practice-template](https://github.com/fujia-cli/frontend-practice-template)
