document.getElementById('current-year').textContent = `© ${new Date().getFullYear()} Marian Bodnar. All rights reserved.`;

particlesJS("particles-js", {
  "particles": {
      "number": { "value": 100 },
      "size": { "value": 3 },
      "color": { "value": "#00f0ff" },
      "line_linked": { "enable": true, "color": "#00f0ff" }
  },
  "interactivity": {
      "events": { "onhover": { "enable": true, "mode": "repulse" } }
  }
});

// Work Experience Timeline data
const workTimelineData = [
    {
        title: "Nagarro - Remote",
        company: "Junior DevOps",
        period: "November, 2023 - Present",
        description: "Developing and maintaining CI pipeline using GitLabCI. Deploying and managing applications on Kubernetes using various manifests (Deployments, Services, Ingress, ConfigMaps). Creating and publishing Dockerfiles and Helm charts to Harbor/JFrog or creating small Python projects to use Harbor API. Automating the creation of a POC K8s cluster on 3 VMs using Ansible.",
        icon: "fas fa-infinity"
    },
    {
        title: "Nagarro - Remote",
        company: "Intern DevOps",
        period: "July, 2022 - August, 2022",
        description: "Before the internship, I participated in a remote learning program with weekly meetings focusing on the basics of Linux, Docker, and Jenkins. During the internship, I applied and enhanced that knowledge through practice. I was working for Dockerfile, Jenkins pipeline that built and pushed the image in ECS and after deploying the on ECS or EKS. Also, I developed a cron pipeline that creates/destroys the infrastructure written using Terraform IaC.",
        icon: "fas fa-infinity"
    },
    {
        title: "Intern DevOps",
        company: "Endava - Remote",
        period: "July, 2023 - August, 2023",
        description: "As part of an eight-person team, contributed to the development of infrastructure using Terraform. After we had the infrastructure set up each one had different tasks. My responsibilities included designing and implementing Dockerfile. for backend applications and creating Kubernetes manifests for resources such as Deployments, Services, and Ingress. Another task was to create a backup for database every day and I used the K8s CronJob for this.",
        icon: "fas fa-infinity"
    },
    {
      title: "Antaco Romania S.R.L - Suceava, RO/Remote",
      company: "C/C++ Developer",
      period: "October, 2019 - July, 2022",
      description: "Developed and maintained C/C++ code, including refactoring legacy C code into modern C++. Implemented comprehensive unit tests using the Google Test framework. Contributing to front-end web development using HTML, CSS, and JavaScript/jQuerry. Besides, I changed/adapted the CI pipeline for the newly developed code.",
      icon: "fas fa-code"
    },
    {
      title: "Antaco Romania S.R.L - Suceava, RO",
      company: "Trainee C/C++ Developer",
      period: "July, 2019 - October, 2019",
      description: "Gained practical experience in software development using C/C++ (mostly based on standard 11). I was using external libraries such as Boost. Also, I learned how to structure and use package managers such as CMake or Conan for building and managing dependencies. Besides those, I was learning the basics of Linux and how to connect to MariaDB using C++ connectors. At the end of the practice, I developed a project that used all the learned technologies.",
      icon: "fas fa-code"
    }
];

// Studies Timeline data
const studiesTimelineData = [
    {
        title: "Master of Computer Science and Engineering",
        institution: "STEFAN CEL MARE University of Suceava",
        period: "2021 - 2023",
        description: "Studied various aspects of computer science.",
        icon: "fas fa-graduation-cap"
    },
    {
        title: "Master of Science in Computer Science",
        institution: "STEFAN CEL MARE University of Suceava",
        period: "2017 - 2022",
        description: "Specialized in computer ccience.",
        icon: "fas fa-graduation-cap"
    }
];

// Credly embed codes
const credlyEmbedCodes = [
  `<div data-iframe-width="350" data-iframe-height="270" data-share-badge-id="e3536e2b-a534-427c-b7b7-38ee1078c832" data-share-badge-host="https://www.credly.com"></div><script type="text/javascript" async src="//cdn.credly.com/assets/utilities/embed.js"></script>`,

  `<div data-iframe-width="350" data-iframe-height="270" data-share-badge-id="88be74a4-3418-4577-b53f-8f978423208c" data-share-badge-host="https://www.credly.com"></div><script type="text/javascript" async src="//cdn.credly.com/assets/utilities/embed.js"></script>`,

  `<div data-iframe-width="350" data-iframe-height="270" data-share-badge-id="3cbbbda5-ba6c-4635-a861-3bb6b13b332f" data-share-badge-host="https://www.credly.com"></div><script type="text/javascript" async src="//cdn.credly.com/assets/utilities/embed.js"></script>`,

  `<div data-iframe-width="350" data-iframe-height="270" data-share-badge-id="9301eeea-c745-4c9b-8b06-015aeb609560" data-share-badge-host="https://www.credly.com"></div>`,

  `<div data-iframe-width="350" data-iframe-height="270" data-share-badge-id="1b6dd5fb-0cbe-4f08-8f75-da28b88d455e" data-share-badge-host="https://www.credly.com"></div><script type="text/javascript" async src="//cdn.credly.com/assets/utilities/embed.js"></script>`,
    
];

const skills = [
    { icon: 'devicon-docker-plain', text: 'Docker' },
    { icon: 'devicon-kubernetes-plain', text: 'Kubernetes' },
    { icon: 'devicon-python-plain', text: 'Python' },
    { icon: 'devicon-javascript-plain', text: 'JavaScript' },
    { icon: 'devicon-linux-plain', text: 'Linux' },
    { icon: 'devicon-git-plain', text: 'Git' },
    { icon: 'devicon-terraform-plain', text: 'Terraform' },
    { icon: 'devicon-ansible-plain', text: 'Ansible' },
    { icon: 'devicon-jenkins-plain', text: 'Jenkins' },
    { icon: 'devicon-amazonwebservices-plain-wordmark', text: 'AWS' }
];

// Function to generate timeline
function generateTimeline(timelineData, placeholderId) {
    const timelineContainer = document.createElement('div');
    timelineContainer.className = 'relative timeline-container';

    const timelineLine = document.createElement('div');
    timelineLine.className = 'timeline';
    timelineContainer.appendChild(timelineLine);

    timelineData.forEach((item, index) => {
        const timelineIcon = document.createElement('div');
        timelineIcon.className = 'timeline-icon';
        timelineIcon.innerHTML = `<i class="${item.icon}"></i>`;
        timelineIcon.style.top = `${(index + 1) * (100 / (timelineData.length + 1))}%`;
        timelineContainer.appendChild(timelineIcon);

        const timelineItem = document.createElement('div');
        timelineItem.className = `timeline-item ${index % 2 === 0 ? 'left' : 'right'}`;
        timelineItem.innerHTML = `
            <div class="timeline-card my-5">
                <h3 class="text-cyan-400 font-bold">${item.title}</h3>
                <p? class="text-gray-400">${item.company || item.institution}</p>
                <p? class="text-gray-400">${item.period}</p?>
                <p class="text-sm text-gray-500 my-5">${item.description}</p>
            </div>
        `;
        timelineContainer.appendChild(timelineItem);
    });

    document.getElementById(placeholderId).appendChild(timelineContainer);
}

// Function to generate Credly grid
function generateCredlyGrid(embedCodes, placeholderId) {
    const gridContainer = document.createElement('div');
    gridContainer.className = 'credly-grid';

    embedCodes.forEach(code => {
        const gridItem = document.createElement('div');
        gridItem.innerHTML = code;
        gridContainer.appendChild(gridItem);
    });

    document.getElementById(placeholderId).appendChild(gridContainer);

    // Load Credly embed script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = '//cdn.credly.com/assets/utilities/embed.js';
    document.body.appendChild(script);
}

// Function to generate skills grid
function generateSkillsGrid(skills, placeholderId) {
  const gridContainer = document.createElement('div');
  gridContainer.className = 'skills-grid';

  skills.forEach(skill => {
      const gridItem = document.createElement('div');
      gridItem.className = 'skills-grid-item';
      gridItem.innerHTML = `
          <i class="${skill.icon} devicon text-4xl"></i>
          <p class="mt-2">${skill.text}</p>
      `;
      gridContainer.appendChild(gridItem);
  });

  document.getElementById(placeholderId).appendChild(gridContainer);
}

// Generate timelines
generateTimeline(workTimelineData, 'timeline-placeholder');
generateTimeline(studiesTimelineData, 'studies-timeline-placeholder');

// Generate Credly grid
generateCredlyGrid(credlyEmbedCodes, 'credly-grid-placeholder');

// Generate skills grid
generateSkillsGrid(skills, 'skills-grid-placeholder');
