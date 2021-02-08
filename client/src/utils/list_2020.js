import { MyLink } from './my_link';

export const list2020 = [
  {
    title: 'Go Starter',
    github: (
      <MyLink
        title='git'
        href='https://github.com/Nibor808/go-starter'
        klass='git-link'
      />
    ),
    text: () => {
      return [
        <p key='main1'>
          Recently I have become more interested in the Go programming language.
          The code is clean and concise with an excellent concurrency model.
        </p>,
        <p key='main2'>
          I started to build a web server to learn more about using Go in an actual app.
          2020 gave me a lot of time to tinker and add features as I became more
          comfortable with the language.
        </p>,
        <p key='main3'>
          Go Starter is a single container Docker app written in Go with cookie based session
          verification using JWT signing, and connecting to a MongoDB instance.
        </p>
      ]
    }
  },
]