# My portofolio

![Build](https://github.com/loiclovitana/loic-portofolio/actions/workflows/build-hugo.yaml/badge.svg)
![Deployment](https://github.com/loiclovitana/loic-portofolio/actions/workflows/deploy-hugo.yaml/badge.svg)

Website using the Hugo framework used as my portofolio for past experience and projects.

## Download

- Clone the repo: `git clone https://github.com/loiclovitana/loic-portofolio.git`.
- Or [Download from GitHub](https://github.com/loiclovitana/loic-portofolio/releases).
- Initialize the submodule: `git submodule init && git submodule update`

## Build

- use the Dockerfile in `.devcontainer/Dockerfile`
- or Open a github Codespace

Then run `./run_dev`

**Alternatively**

1. Install Hugo extended edition :

- See [https://gohugo.io/installation/](https://gohugo.io/installation/)
- The project was developed on version V0.133.0. You can download the specific version [HERE](https://github.com/gohugoio/hugo/releases/tag/v0.133.0)

2. Make sure NodeJS is installed on your machine: [Download Here](https://nodejs.org/en/download/package-manager/current)

3. Install NodeJs dependencies:
    1. Enter the newly created folder: `cd <your website's name>/`
    2. Install PostCSS: execute `npm i -D postcss postcss-cli autoprefixer` from the top-level site folder

4. Start the server : `./run_dev` or `hugo server -D`

---
Thanks to [Adriatan](https://github.com/zetxek/adritian-free-hugo-theme.git) for his Hugo Theme
