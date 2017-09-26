# Password Manager

> This is a simple password manager application built on [VueJS](https://vuejs.org/) and [Electron](https://electron.atom.io/). I'm doing this project for study purpose, since I want to become a front end developer, but also for my personal use. 

![Demo image](https://i.imgur.com/OyRmzZ0.png)

All my passwords are 16 characters long and randomly generated from A-Z, 0-9 and special characters included, so it's really hard to remember. Right now I'm using a web version and have to manually edit HTML everytime I want to add/remove/update anything.

I chose VueJS because it's easy to start, and with some basic knownledge when I've learned React, jump into VueJS is really interesting. I want to focus in VueJS, so I used the boilerplate [electron-vue](https://github.com/SimulatedGREG/electron-vue) to generate. 
Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).

## Features
The application should have these features, but some of them are under development.
- [x] Add new item (each item is a row of password.)
- [x] Use vue-router to navigate instead of pop-up modal.
- [x] Validation of input.
- [x] Find good database and intergrate into app. 
- [x] Read/write to database.

## Work in Progress
These are features I'm working on it:
- [ ] Encrypt password input.
- [ ] Edit/delete record.
- [ ] Sort by alphabetical order.
- [ ] Sort by frequent of clicks.
- [ ] Instant search.
- [ ] Setting: backup/restore items.

## Build Setup
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

```
---

## Calling for HELP! 

I'm a graphic designer [(click to see my portfolio,)](https://www.behance.net/sangdth) but unlike many others, I never formally trained at a school. Instead, I learned my skills through observation, self-directed study and work experience from 2004.

Recent years I've moved slightly to web design, then UI/UX, and last year, I felt in love with NodeJS. Right now I'm still self-studying everything just by reading tutorials and online courses, so, I really need help. 

You can do anything, mentor, find bugs, raise issue, folk, create pull request, or even drop me a message at Twitter [@sangdth](https://twitter.com/sangdth), you are more than welcome.

## License

[MIT](https://github.com/electron/electron/blob/master/LICENSE)
