import odfFullThumb from '../styles/images/odf-full-thumb.jpg';
import odfFull from '../styles/images/odf-full.jpg';
import odfFormsThumb from '../styles/images/odf-forms-thumb.jpg';
import odfForms from '../styles/images/odf-forms.jpg';
import odfAccessSchedulerThumb from '../styles/images/odf-access-scheduler-thumb.jpg';
import odfAccessScheduler from '../styles/images/odf-access-scheduler.jpg';
import jesstech from '../styles/images/jesstech.jpg';
import lakeshore from '../styles/images/lakeshore.jpg';
import incuboOld from '../styles/images/incubo_old.jpg';
import { MyLink } from '../components/MyLink';
import { Item } from '../components/PortfolioItem';

export const list2017: Item[] = [
  {
    title: 'Online Divorce Forms',
    text: () => {
      return [
        <p key='main1'>
          <MyLink title='ODF' href='https://www.onlinedivorceforms.ca/' /> is a
          service that simplifies the complex process of getting divorced or
          separated in Ontario.
          <small>
            (currently in development and behind an authorization wall - this
            code is not public)
          </small>
        </p>,
        <p key='main2'>
          It allows a user to complete most of the forms required by stepping
          through a series of questions and then determining if there are any
          additional forms that must be completed. The forms can then be edited,
          downloaded as .docx, or faxed.
        </p>,
        <p key='main3'>
          ODF features auto-save and resume functionality, the ability to add
          and edit a digital signature, editing information that is common to
          all forms in a central location, a graphical interface for setting a
          separate access schedule for each child or one schedule for all
          children, as well as an admin section allowing an admin user to log in
          as another user, set a banner notification for all users, email all
          users, as well as checking error logs and the status of any faxes
          sent.
        </p>,
        <p key='main4'>
          ODF is built as a multi container Docker app with a Node JS
          React/Redux client, Node JS api, an NGINX container routing traffic
          and utilizing MongoDB and Mongoose ODM.
        </p>,
      ];
    },
    image: handleClick => {
      return (
        <div className='row'>
          <div className='col'>
            <img
              src={odfFullThumb}
              className='img-fluid clickable'
              alt='Online Divorce Forms Landing Page'
              data-text={odfFull}
              onClick={ev => handleClick(ev)}
            />
          </div>

          <div className='col'>
            <img
              src={odfFormsThumb}
              className='img-fluid clickable'
              alt={`Online Divorce Forms User's Forms List`}
              data-text={odfForms}
              onClick={ev => handleClick(ev)}
            />
          </div>

          <div className='col'>
            <img
              src={odfAccessSchedulerThumb}
              className='img-fluid clickable'
              alt='Online Divorce Forms Access Scheduler'
              data-text={odfAccessScheduler}
              onClick={ev => handleClick(ev)}
            />
          </div>
        </div>
      );
    },
  },
  {
    title: 'JessTech',
    github: (
      <MyLink
        title='git'
        href='https://github.com/Nibor808/jess-blog'
        klass='git-link'
      />
    ),
    text: () => {
      return [
        <p key='main1'>
          A for fun project to learn React/Redux. JessTech is a database driven
          blog site built using Node JS and React/Redux.
        </p>,
        <p key='main2'>
          It allows a user to search all posts by keyword, comment on posts and
          reply to comments, or post a question to the admin. It also has a
          limited CMS on the admin page for creating posts.
        </p>,
        <p key='main3'>
          It features JSON Web Token authentication through Passport, MySQL with
          Knex query builder, and Webpack.
        </p>,
      ];
    },
    image: () => (
      <img src={jesstech} className='img-fluid' alt='Jesstech Landing Page' />
    ),
  },
  {
    title: 'Lakeshore Electric',
    text: () => (
      <p>
        I was approached by an electrical contractor to increase their business
        potential through a web presence. They envisioned a straight brochure
        style site to illustrate their company and its services. I worked
        closely with them to bring their vision to life. Without the need for
        any backend Lakeshore Electric was built using HTML5, CSS3 and jQuery.
        (no longer active)
      </p>
    ),
    image: () => (
      <img
        src={lakeshore}
        className='img-fluid'
        alt='Lakeshore Electric Landing Page'
      />
    ),
  },
  {
    title: 'Incubo Web Solutions',
    github: (
      <MyLink
        title='git'
        href='https://github.com/Nibor808/incubo'
        klass='git-link'
      />
    ),
    text: () => (
      <p>
        The old Incubo site. The black and white design was complimented by
        colourising the link squares on rollover. Built on Node JS with HTML5,
        Handlebars, CSS3, and jQuery.
      </p>
    ),
    image: () => (
      <img
        src={incuboOld}
        className='img-fluid'
        alt='Old Incubo Landing Page'
      />
    ),
  },
];
