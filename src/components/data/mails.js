// Example search data used by ../Search.js component.
// TODO: replace with searchable/indexed repositories that user's want contributions to (retrieved and stored from github).
export default [{
    id: 1,
    user: {
      name: 'Mathieu',
      job: 'Software Engineer',
      company: 'Enki'
    },
    subject: 'Hi!',
    dest: [
      {
        name: 'Bruno',
        job: 'CTO',
        company: 'Enki'
      },
      {
        name: 'Arseny',
        job: 'Software Engineer',
        company: 'Enki'
      }
    ]
  }, {
    id: 2,
    user: {
      name: 'Bruno'
    },
    subject: 'javascript',
    dest: [
      {
        name: 'Mathieu',
        job: 'CTO',
        company: 'Enki'
      },
      {
        name: 'Arseny',
        job: 'Software Engineer',
        company: 'Enki'
      }
    ]
  }, {
    id: 3,
    user: {
      name: 'you can search for me using a regex : `java$`'
    },
    subject: 'java',
    dest: [
      {
        name: 'Bruno',
        job: 'CTO',
        company: 'Enki'
      },
      {
        name: 'Arseny',
        job: 'Software Engineer',
        company: 'Enki'
      }
    ]
  }]