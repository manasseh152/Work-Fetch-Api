const nav = document.querySelector('#nav');
const aside = document.querySelector('#aside');
const main = document.querySelector('#main');
const JOB_API_URL = 'http://localhost:3001/jobs'

const jobPromise = fetch(JOB_API_URL);

let jobUl;
let jobli;
let jobList;

jobPromise
  .then(res => {
    res.json();
    console.log(res);
  })
  .then(jobs => loadJobs(jobs.results))
;

// navbar

function loadNavbar() {
  let navLi  = [
    {title: 'H',href: './'},
    // {title: 'J',href: './Jobs'},
    // {title: 'S',href: './Settings'},
  ];

  let navUl = document.createElement('ul');

  navLi.forEach(e => {
    const html = `<a href="${e.href}">${e.title}</a>`;
    let li = document.createElement('li');
    li.innerHTML = html
    li.classList.add('nav-li')
    navUl.appendChild(li);
  });

  nav.appendChild(navUl)
}

loadNavbar();

// jobs

function loadJobs(jobArry) {
  jobUl = document.createElement('ul');
  jobList = jobArry;
  jobArry.forEach((e,i) => {
    const html = `<h3>${e.title}</h3>`;
    let li = document.createElement('button');
    li.innerHTML = html
    li.setAttribute('data-job-index', i)
    jobUl.appendChild(li);
  });
  aside.appendChild(jobUl);
  jobli = document.querySelectorAll('[data-job-index]');
  arrayAddEventListener(jobli)
} 

function arrayAddEventListener(array) {
  array.forEach(e => {
    let createElement = (e) => {
      let index = e.currentTarget.getAttribute('data-job-index')
      job = jobList[index]
      averageSal = (job.salary_min + job.salary_max) / 2; 
      let html = `
      <div>
        <h3>Job titile: ${job.title}</h3>
        <h4>Average salary: ${averageSal}</h4>
        <h5>Date: ${job.created}</h5>
        <br>
        <h4>Company: ${job.company.display_name}</h4>
        <h5>Location: ${job.location.display_name}</h5>
        <p>description: ${job.description}</p>
        <a href="${job.redirect_url}">Go to site</a>
      </div>
      `;
      main.innerHTML = html
    }
    e.addEventListener('click', (e) => {
      createElement(e)
    })
    e.addEventListener('focus', (e) => {
      createElement(e)
    })
  });
}