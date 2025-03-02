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

// Function to generate projects grid with YouTube videos and project links
function generateProjectsGrid(videoUrls, projectLinks, placeholderId) {
    const projectsGrid = document.getElementById(placeholderId);

    videoUrls.forEach((videoUrl, index) => {
        const div = document.createElement('div');
        div.className = 'project-item';
        div.innerHTML = `
            <iframe width="100%" height="315" src="${videoUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <ul class="project-links mt-8">
                ${projectLinks[index].map(link => `
                    <li>
                        <a href="${link.url}" target="_blank">
                            <i class="fab ${link.icon}"></i> ${link.text}
                        </a>
                    </li>
                `).join('')}
            </ul>
        `;
        projectsGrid.appendChild(div);
    });
}

// Function to generate projects grid with YouTube videos
function generateProjectsVideos(videoUrls, placeholderId) {
    const projectsGrid = document.getElementById(placeholderId);

    videoUrls.forEach(videoUrl => {
        const div = document.createElement('div');
        div.className = 'project-item';
        div.innerHTML = `
            <iframe width="100%" height="315" src="${videoUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        `;
        projectsGrid.appendChild(div);
    });
}

// Function to generate project links
function generateProjectLinks(projectLinks, placeholderId) {
    const projectsGrid = document.getElementById(placeholderId);

    projectLinks.forEach(link => {
        const div = document.createElement('div');
        div.className = 'project-link-item';
        div.innerHTML = `
            <a href="${link.url}" target="_blank">
                <i class="fab ${link.icon}"></i> ${link.text}
            </a>
        `;
        projectsGrid.appendChild(div);
    });
}

// List of YouTube video URLs
const videoUrls = [
    "https://www.youtube.com/embed/cdDyN_a_TII",
    "https://www.youtube.com/embed/2nzw8ehkXJE",
    // Add more video URLs as needed
];

// List of project links
const projectLinks = [
    { url: "https://github.com/bmarian98/terraform_5", text: "AWS Terraform", icon: "fa-github" },
    { url: "https://gitlab.com/devops-project23/frontend", text: "Backend", icon: "fa-gitlab" },
    { url: "https://gitlab.com/devops-project23/backend", text: "Frontend", icon: "fa-gitlab" },
    { url: "https://gitlab.com/devops-project23/infrastructure", text: "Infrastructure", icon: "fa-gitlab" },
    // Add more project links as needed
];

// Function to create a tree view for the Python files
function createTreeView(container, data) {
    console.log("Creating tree view with data:", data); // Debug log
    
    // Clear any existing content
    container.innerHTML = '';
    
    // Create the root node
    const rootNode = document.createElement('div');
    rootNode.className = 'tree-root';
    
    // Create the python node (top level)
    const pythonNode = createTreeNode('python', 'folder', true);
    rootNode.appendChild(pythonNode);
    
    // Create children container for python node
    const pythonChildren = document.createElement('div');
    pythonChildren.className = 'tree-children';
    pythonChildren.style.display = 'block'; // Make visible by default
    
    // Add files to the tree
    if (data.files && data.files.length > 0) {
        data.files.forEach(file => {
            const fileNode = createTreeNode(file.name, file.type === 'notebook' ? 'notebook' : 'file', false, file.path);
            pythonChildren.appendChild(fileNode);
        });
    } else {
        console.log("No files found in data"); // Debug log
    }
    
    // Add folders if they exist
    if (data.folders && data.folders.length > 0) {
        data.folders.forEach(folder => {
            const folderNode = createTreeNode(folder.name, 'folder', true);
            const folderChildren = document.createElement('div');
            folderChildren.className = 'tree-children';
            
            // Add files in the folder
            if (folder.files && folder.files.length > 0) {
                folder.files.forEach(file => {
                    const fileNode = createTreeNode(file.name, file.type === 'notebook' ? 'notebook' : 'file', false, file.path);
                    folderChildren.appendChild(fileNode);
                });
            }
            
            folderNode.appendChild(folderChildren);
            pythonChildren.appendChild(folderNode);
        });
    }
    
    pythonNode.appendChild(pythonChildren);
    container.appendChild(rootNode);
    
    // Expand the root node by default
    const nodeContent = pythonNode.querySelector('.tree-node-content');
    if (nodeContent) {
        nodeContent.setAttribute('data-expanded', 'true');
        const icon = nodeContent.querySelector('i');
        if (icon) {
            icon.className = 'fas fa-folder-open tree-node-icon';
        }
    }
}

// Function to create a tree node
function createTreeNode(label, type, hasChildren, path) {
    const node = document.createElement('div');
    node.className = 'tree-node';
    
    const nodeContent = document.createElement('div');
    nodeContent.className = 'tree-node-content';
    
    // Set icon based on type
    const icon = document.createElement('i');
    if (type === 'folder') {
        icon.className = 'fas fa-folder tree-node-icon';
        nodeContent.setAttribute('data-expanded', 'false');
    } else if (type === 'notebook') {
        icon.className = 'fas fa-book-open tree-node-icon notebook-icon';
    } else {
        icon.className = 'fas fa-file tree-node-icon file-icon';
    }
    
    const nodeLabel = document.createElement('span');
    nodeLabel.className = 'tree-node-label';
    nodeLabel.textContent = label;
    
    nodeContent.appendChild(icon);
    nodeContent.appendChild(nodeLabel);
    node.appendChild(nodeContent);
    
    // Add click event for folders to expand/collapse
    if (type === 'folder') {
        nodeContent.addEventListener('click', function() {
            toggleTreeNode(this);
        });
    }
    
    // Add click event for files to load content
    if (type === 'notebook' || type === 'file') {
        nodeContent.addEventListener('click', function() {
            if (type === 'notebook') {
                loadNotebook(path);
            } else {
                loadPythonFile(path);
            }
        });
    }
    
    return node;
}

// Function to toggle tree node expansion
function toggleTreeNode(nodeContent) {
    const isExpanded = nodeContent.getAttribute('data-expanded') === 'true';
    const node = nodeContent.parentElement;
    const icon = nodeContent.querySelector('i');
    
    if (isExpanded) {
        // Collapse
        nodeContent.setAttribute('data-expanded', 'false');
        icon.className = 'fas fa-folder tree-node-icon';
        
        // Find and hide children container
        const childrenContainer = node.querySelector('.tree-children');
        if (childrenContainer) {
            childrenContainer.style.display = 'none';
        }
    } else {
        // Expand
        nodeContent.setAttribute('data-expanded', 'true');
        icon.className = 'fas fa-folder-open tree-node-icon';
        
        // Find and show children container
        const childrenContainer = node.querySelector('.tree-children');
        if (childrenContainer) {
            childrenContainer.style.display = 'block';
        }
    }
}

// Function to dynamically load the file tree
function loadFileTree() {
    const treeContainer = document.getElementById('file-tree');
    if (!treeContainer) {
        console.log("Tree container not found"); // Debug log
        return;
    }
    
    const loadingElement = document.getElementById('loading-tree');
    
    console.log("Fetching courses.json"); // Debug log
    
    // Fetch the JSON file that contains the file list
    fetch('courses.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Could not load file list');
            }
            return response.json();
        })
        .then(data => {
            console.log("Loaded data:", data); // Debug log
            
            // Remove loading indicator if it exists
            if (loadingElement) {
                loadingElement.remove();
            }
            
            // Create the tree view
            createTreeView(treeContainer, data);
        })
        .catch(error => {
            console.error('Error loading file tree:', error);
            
            // If there's an error, use hardcoded data as fallback
            console.log("Using hardcoded data as fallback");
            
            const hardcodedData = {
                "files": [
                    {
                        "name": "first.ipynb",
                        "path": "python/first.ipynb",
                        "type": "notebook"
                    },
                    {
                        "name": "second.ipynb",
                        "path": "python/second.ipynb",
                        "type": "notebook"
                    }
                ],
                "folders": []
            };
            
            // Remove loading indicator if it exists
            if (loadingElement) {
                loadingElement.remove();
            }
            
            // Create the tree view with hardcoded data
            createTreeView(treeContainer, hardcodedData);
        });
}

// Function to load and display a Jupyter notebook
function loadNotebook(notebookPath) {
    const contentContainer = document.getElementById('file-content');
    if (!contentContainer) return;
    
    contentContainer.innerHTML = `
        <div class="flex items-center justify-center h-full">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
            <span class="ml-3">Loading notebook...</span>
        </div>
    `;
    
    fetch(notebookPath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(notebook => {
            renderNotebook(notebook, notebookPath);
        })
        .catch(error => {
            console.error('Error loading notebook:', error);
            contentContainer.innerHTML = `
                <div class="bg-red-900 bg-opacity-20 border border-red-500 text-red-300 p-4 rounded">
                    <h3 class="font-bold mb-2">Error Loading Notebook</h3>
                    <p>${error.message}</p>
                </div>
            `;
        });
}

// Function to load and display a Python file
function loadPythonFile(filePath) {
    const contentContainer = document.getElementById('file-content');
    if (!contentContainer) return;
    
    contentContainer.innerHTML = `
        <div class="flex items-center justify-center h-full">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
            <span class="ml-3">Loading file...</span>
        </div>
    `;
    
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(code => {
            contentContainer.innerHTML = `
                <h2 class="text-2xl font-bold mb-4">${filePath.split('/').pop()}</h2>
                <pre><code class="language-python">${escapeHtml(code)}</code></pre>
            `;
            
            if (window.Prism) {
                Prism.highlightAll();
            }
        })
        .catch(error => {
            console.error('Error loading file:', error);
            contentContainer.innerHTML = `
                <div class="bg-red-900 bg-opacity-20 border border-red-500 text-red-300 p-4 rounded">
                    <h3 class="font-bold mb-2">Error Loading File</h3>
                    <p>${error.message}</p>
                </div>
            `;
        });
}

// Function to render a Jupyter notebook
function renderNotebook(notebook, path) {
    const contentContainer = document.getElementById('file-content');
    if (!contentContainer) return;
    
    // Create header with notebook info
    const header = document.createElement('div');
    header.className = 'mb-8';
    header.innerHTML = `
        <h2 class="text-2xl font-bold mb-2">${path.split('/').pop()}</h2>
        <div class="flex flex-wrap gap-3 mb-4">
            <span class="px-3 py-1 bg-blue-900 text-blue-200 text-xs rounded-full">
                <i class="fas fa-book-open mr-1"></i> Jupyter Notebook
            </span>
            <span class="px-3 py-1 bg-purple-900 text-purple-200 text-xs rounded-full">
                <i class="fab fa-python mr-1"></i> ${notebook.metadata.kernelspec?.name || 'Python'}
            </span>
        </div>
    `;
    
    // Create container for cells
    const cellsContainer = document.createElement('div');
    cellsContainer.className = 'notebook-cells';
    
    // Render each cell
    notebook.cells.forEach((cell, index) => {
        const cellDiv = document.createElement('div');
        cellDiv.className = 'notebook-cell';
        
        // Cell type indicator
        const cellTypeDiv = document.createElement('div');
        cellTypeDiv.className = 'cell-type';
        cellTypeDiv.innerHTML = `<i class="fas ${cell.cell_type === 'code' ? 'fa-code' : 'fa-align-left'}"></i> ${cell.cell_type}`;
        cellDiv.appendChild(cellTypeDiv);
        
        // Cell content
        const contentDiv = document.createElement('div');
        contentDiv.className = 'cell-content';
        
        if (cell.cell_type === 'markdown') {
            // For markdown cells, we'll use a simple rendering approach
            contentDiv.innerHTML = cell.source.join('').replace(/\n/g, '<br>');
        } else if (cell.cell_type === 'code') {
            // Code input
            const codeInput = document.createElement('pre');
            codeInput.className = 'code-input';
            const codeElement = document.createElement('code');
            codeElement.className = 'language-python';
            codeElement.textContent = cell.source.join('');
            codeInput.appendChild(codeElement);
            contentDiv.appendChild(codeInput);
            
            // Code output
            if (cell.outputs && cell.outputs.length > 0) {
                const outputDiv = document.createElement('div');
                outputDiv.className = 'code-output';
                
                cell.outputs.forEach(output => {
                    if (output.output_type === 'stream') {
                        const outputText = document.createElement('pre');
                        outputText.className = 'mb-0';
                        outputText.textContent = output.text.join('');
                        outputDiv.appendChild(outputText);
                    } else if (output.output_type === 'execute_result' || output.output_type === 'display_data') {
                        if (output.data['text/plain']) {
                            const outputText = document.createElement('pre');
                            outputText.className = 'mb-0';
                            outputText.textContent = output.data['text/plain'].join('');
                            outputDiv.appendChild(outputText);
                        }
                    } else if (output.output_type === 'error') {
                        const errorDiv = document.createElement('div');
                        errorDiv.className = 'bg-red-900 bg-opacity-20 p-3 rounded';
                        errorDiv.innerHTML = `<strong class="text-red-400">${output.ename}: ${output.evalue}</strong>`;
                        if (output.traceback) {
                            const traceback = document.createElement('pre');
                            traceback.className = 'text-red-300 text-sm mt-2';
                            traceback.textContent = output.traceback.join('').replace(/\u001b\[\d+m/g, '');
                            errorDiv.appendChild(traceback);
                        }
                        outputDiv.appendChild(errorDiv);
                    }
                });
                
                contentDiv.appendChild(outputDiv);
            }
        }
        
        cellDiv.appendChild(contentDiv);
        cellsContainer.appendChild(cellDiv);
    });
    
    // Clear the container and add the rendered notebook
    contentContainer.innerHTML = '';
    contentContainer.appendChild(header);
    contentContainer.appendChild(cellsContainer);
    
    // Apply syntax highlighting
    if (window.Prism) {
        Prism.highlightAll();
    }
}

// Helper function to escape HTML
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM content loaded"); // Debug log
    
    // Set current year in footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = `© ${new Date().getFullYear()} Marian Bodnar. All rights reserved.`;
    }
    
    // Initialize particles.js if the element exists
    const particlesElement = document.getElementById('particles-js');
    if (particlesElement && typeof particlesJS !== 'undefined') {
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
    }
    
    // Generate timelines if the elements exist
    if (document.getElementById('timeline-placeholder')) {
        generateTimeline(workTimelineData, 'timeline-placeholder');
    }
    
    if (document.getElementById('studies-timeline-placeholder')) {
        generateTimeline(studiesTimelineData, 'studies-timeline-placeholder');
    }

    // Generate Credly grid if the element exists
    if (document.getElementById('credly-grid-placeholder')) {
        generateCredlyGrid(credlyEmbedCodes, 'credly-grid-placeholder');
    }

    // Generate skills grid if the element exists
    if (document.getElementById('skills-grid-placeholder')) {
        generateSkillsGrid(skills, 'skills-grid-placeholder');
    }

    // Generate projects grid with videos if the element exists
    if (document.getElementById('projects-videos-grid')) {
        generateProjectsVideos(videoUrls, 'projects-videos-grid');
    }

    // Generate project links if the element exists
    if (document.getElementById('projects-links-grid')) {
        generateProjectLinks(projectLinks, 'projects-links-grid');
    }
    
    // Load file tree if on the Python explorer page
    if (document.getElementById('file-tree')) {
        console.log("File tree element found, loading tree"); // Debug log
        loadFileTree();
    }
});
