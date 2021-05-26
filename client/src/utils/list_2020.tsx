import { MyLink } from '../components/MyLink';
import { Item } from '../components/PortfolioItem';

export const list2020: Item[] = [
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
          I started to build a web server to learn more about using Go in an
          actual app. 2020 gave me a lot of time to tinker and add new features
          as I became more comfortable with the language.
        </p>,
        <p key='main3'>
          Go Starter is a multi container Docker app with a React client, a Go
          api with cookie based session verification using JWT signing, an NGINX
          container for routing, and connecting to a MongoDB instance.
        </p>,
      ];
    },
  },
];
