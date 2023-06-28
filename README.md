# Search Hacker News

Integrate Hacker News API to provide better search experience.

## Features

- RWD
  ![RWD](/README/RWD.png)

## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd hacker-news-search
```

Install dependencies

```bash
  pnpm install
```

Start the server

```bash
  pnpm build
```

```bash
  pnpm start
```

Or you can just run development server

```bash
  pnpm dev
```

## Tech Stack

#### Typescript

I do like **Typesafe**.

#### Next.js

Next.js, which is highly [recommended]("https://react.dev/learn/start-a-new-react-project") in the React documentation, offers a wide range of features including server-side rendering and filepath routes. The primary reason for choosing Next.js was its convenience and the great developer experience it offers. Moreover, the incorporation of server-side rendering enables flexibility in adding static data to my pages whenever required.

#### TailwindCSS

Tailwind CSS is my preferred CSS framework for several reasons. Firstly, it eliminates the need for me to concern myself with naming classes, saving me time and effort. Additionally, it offers a range of pre-defined styles that are easy to implement, significantly reducing the amount of code required. Moreover, the framework's clear and intuitive nature allows me to easily understand the style of an element without having to refer to the class definition. When combined with VSCode extensions and React components, Tailwind CSS enhances the overall developer experience, making it a truly remarkable choice.

#### Tanstack Query

Tanstack Query is an impressive package that offers robust asynchronous state management capabilities. I opted for it due to its convenient and declarative API, especially for infinite queries. Additionally, it efficiently caches the results of API calls for a customizable duration, which effectively reduces request times.

#### Dompurify

he Hacker News API offers outstanding search results in HTML format, which is highly beneficial. However, parsing the HTML requires utilizing embedded HTML, which can be risky and possess potential security concerns. Therefore, I utilize this package to sanitize the HTML content for me, ensuring a safer and more secure implementation.

## Problem that I have encountered & How to solve them

1. Hacker News API **NO TYPE**
   I didn't notice any official type definition about the API calls. To address this, I took the sample output to generate the types. Although there are many "any" type, the types are good enough.

2. UI design
   This bothered me a lot because I'm not majored in design related department. However, UI is greatly affected the users' experiences, which I do really care about. To address this, I refered to the search components in many documentations.
