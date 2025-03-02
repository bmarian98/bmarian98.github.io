// File Explorer functionality

// Default file structure in case JSON fails to load
const defaultFileStructure = {
    "folders": [
        {
            "name": "courses",
            "folders": [
                {
                    "name": "bash",
                    "icon": "fa-terminal",
                    "files": [
                        {
                            "name": "first_script.sh",
                            "path": "courses/bash/first_script.sh",
                            "type": "script"
                        }
                    ]
                },
                {
                    "name": "python",
                    "icon": "fa-python",
                    "files": [
                        {
                            "name": "first.ipynb",
                            "path": "courses/python/first.ipynb",
                            "type": "notebook"
                        },
                        {
                            "name": "second.ipynb",
                            "path": "courses/python/second.ipynb",
                            "type": "notebook"
                        }
                    ]
                }
            ]
        }
    ]
};

// Function to create a tree view
function createTreeView(container, data) {
    // Create the root node
    const rootNode = document.createElement('div');
    rootNode.className = 'tree-root';
    
    // Process folders at the root level
    if (data.folders && data.folders.length > 0) {
        data.folders.forEach(folder => {
            const folderNode = createFolderNode(folder);
            rootNode.appendChild(folderNode);
        });
    }
    
    // Process files at the root level
    if (data.files && data.files.length > 0) {
        data.files.forEach(file => {
            const fileNode = createFileNode(file);
            rootNode.appendChild(fileNode);
        });
    }
    
    container.appendChild(rootNode);
}

// Function to create a folder node
function createFolderNode(folder) {
    const folderNode = document.createElement('div');
    folderNode.className = 'tree-node';
    
    const folderContent = document.createElement('div');
    folderContent.className = 'tree-node-content';
    folderContent.setAttribute('data-expanded', 'false');
    
    const folderIcon = document.createElement('i');
    folderIcon.className = 'fas fa-folder tree-node-icon';
    
    const folderLabel = document.createElement('span');
    folderLabel.className = 'tree-node-label';
    folderLabel.textContent = folder.name;
    
    folderContent.appendChild(folderIcon);
    folderContent.appendChild(folderLabel);
    folderNode.appendChild(folderContent);
    
    // Add click event for folders
    folderContent.addEventListener('click', function() {
        toggleTreeNode(this);
    });
    
    // Create folder children container
    const folderChildren = document.createElement('div');
    folderChildren.className = 'tree-children';
    
    // Add subfolders if they exist
    if (folder.folders && folder.folders.length > 0) {
        folder.folders.forEach(subfolder => {
            const subfolderNode = createFolderNode(subfolder);
            folderChildren.appendChild(subfolderNode);
        });
    }
    
    // Add files in the folder
    if (folder.files && folder.files.length > 0) {
        folder.files.forEach(file => {
            // Pass the folder's icon to the file creation function
            const fileNode = createFileNode(file, folder.icon, folder.name);
            folderChildren.appendChild(fileNode);
        });
    }
    
    folderNode.appendChild(folderChildren);
    return folderNode;
}

// Function to create a file node
function createFileNode(file, folderIcon, folderName) {
    const fileNode = document.createElement('div');
    fileNode.className = 'tree-node';
    
    const fileContent = document.createElement('div');
    fileContent.className = 'tree-node-content';
    
    const fileIcon = document.createElement('i');
    
    // Set icon based on file type or parent folder's icon
    if (file.type === 'notebook' && folderName === 'python' && folderIcon === 'fa-python') {
        fileIcon.className = 'fab fa-python tree-node-icon file-icon-python';
    } else if (file.type === 'script' && folderName === 'bash' && folderIcon === 'fa-terminal') {
        fileIcon.className = 'fas fa-terminal tree-node-icon file-icon-bash';
    } else if (file.type === 'notebook') {
        fileIcon.className = 'fas fa-book-open tree-node-icon notebook-icon';
    } else if (file.type === 'script') {
        fileIcon.className = 'fas fa-file-code tree-node-icon script-icon';
    } else {
        fileIcon.className = 'fas fa-file tree-node-icon file-icon';
    }
    
    const fileLabel = document.createElement('span');
    fileLabel.className = 'tree-node-label';
    fileLabel.textContent = file.name;
    
    fileContent.appendChild(fileIcon);
    fileContent.appendChild(fileLabel);
    fileNode.appendChild(fileContent);
    
    // Add click event for files
    fileContent.addEventListener('click', function() {
        if (file.type === 'notebook') {
            loadNotebook(file.path);
            
            // On mobile, scroll to the content area
            if (window.innerWidth < 768) {
                const contentArea = document.getElementById('file-content');
                if (contentArea) {
                    setTimeout(() => {
                        contentArea.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                }
            }
        } else if (file.type === 'script') {
            loadScript(file.path);
            
            // On mobile, scroll to the content area
            if (window.innerWidth < 768) {
                const contentArea = document.getElementById('file-content');
                if (contentArea) {
                    setTimeout(() => {
                        contentArea.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                }
            }
        } else {
            loadPythonFile(file.path);
            
            // On mobile, scroll to the content area
            if (window.innerWidth < 768) {
                const contentArea = document.getElementById('file-content');
                if (contentArea) {
                    setTimeout(() => {
                        contentArea.scrollIntoView({ behavior: 'smooth' });
                    }, 100);
                }
            }
        }
    });
    
    return fileNode;
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

// Function to load notebook content
function loadNotebook(path) {
    const contentContainer = document.getElementById('file-content');
    if (!contentContainer) return;
    
    contentContainer.innerHTML = `
        <div class="p-4">
            <div class="flex items-center mb-4">
                <i class="fas fa-book-open text-cyan-400 mr-2"></i>
                <h3 class="text-xl font-semibold break-all">${path}</h3>
            </div>
            <div class="loading-indicator">
                <i class="fas fa-spinner fa-spin mr-2"></i> Loading notebook...
            </div>
        </div>
    `;
    
    fetch(path)
        .then(response => {
            if (!response.ok) {
                throw new Error('Could not load notebook');
            }
            return response.json();
        })
        .then(data => {
            renderNotebook(data, contentContainer, path);
        })
        .catch(error => {
            contentContainer.innerHTML = `
                <div class="p-4">
                    <div class="flex items-center mb-4">
                        <i class="fas fa-exclamation-triangle text-red-500 mr-2"></i>
                        <h3 class="text-xl font-semibold">Error Loading Notebook</h3>
                    </div>
                    <p class="text-red-400">${error.message}</p>
                    <p class="mt-4">Please make sure the file exists and is accessible.</p>
                </div>
            `;
        });
}

// Function to render notebook content
function renderNotebook(notebook, container, path) {
    let notebookHtml = `
        <div class="p-4">
            <div class="flex items-center mb-4">
                <i class="fas fa-book-open text-cyan-400 mr-2"></i>
                <h3 class="text-xl font-semibold break-all">${path}</h3>
            </div>
            <div class="notebook-metadata mb-4">
                <p><strong>Kernel:</strong> ${notebook.metadata?.kernelspec?.name || 'Not specified'}</p>
                <p><strong>Language:</strong> ${notebook.metadata?.language_info?.name || 'Not specified'}</p>
            </div>
            <div class="notebook-cells">
    `;
    
    // Render each cell
    if (notebook.cells && notebook.cells.length > 0) {
        notebook.cells.forEach((cell, index) => {
            notebookHtml += `<div class="notebook-cell mb-4 p-3 border border-gray-700 rounded">`;
            
            // Cell header with type and execution count
            notebookHtml += `
                <div class="cell-header flex justify-between items-center mb-2 pb-2 border-b border-gray-700">
                    <span class="cell-type ${cell.cell_type === 'code' ? 'text-blue-400' : 'text-green-400'}">
                        <i class="fas ${cell.cell_type === 'code' ? 'fa-code' : 'fa-paragraph'} mr-2"></i>
                        ${cell.cell_type}
                    </span>
                    ${cell.cell_type === 'code' && cell.execution_count !== null ? 
                        `<span class="execution-count text-gray-500">In [${cell.execution_count}]</span>` : ''}
                </div>
            `;
            
            // Cell content
            if (cell.cell_type === 'markdown') {
                // Simple markdown rendering (just showing the source)
                notebookHtml += `<div class="cell-content markdown-content">`;
                if (cell.source) {
                    const source = Array.isArray(cell.source) ? cell.source.join('') : cell.source;
                    notebookHtml += `<pre class="whitespace-pre-wrap">${source}</pre>`;
                }
                notebookHtml += `</div>`;
            } else if (cell.cell_type === 'code') {
                // Code cell with source and outputs
                notebookHtml += `<div class="cell-content code-content">`;
                
                // Source code
                if (cell.source) {
                    const source = Array.isArray(cell.source) ? cell.source.join('') : cell.source;
                    notebookHtml += `
                        <pre class="language-python"><code class="language-python">${source}</code></pre>
                    `;
                }
                
                // Outputs
                if (cell.outputs && cell.outputs.length > 0) {
                    notebookHtml += `
                        <div class="cell-outputs mt-2 pt-2 border-t border-gray-700">
                            <div class="output-header text-gray-500 mb-1">Out [${cell.execution_count || ''}]:</div>
                    `;
                    
                    cell.outputs.forEach(output => {
                        if (output.output_type === 'stream') {
                            const text = Array.isArray(output.text) ? output.text.join('') : output.text;
                            notebookHtml += `
                                <pre class="output-stream p-2 bg-gray-800 rounded">${text}</pre>
                            `;
                        } else if (output.output_type === 'execute_result' || output.output_type === 'display_data') {
                            if (output.data && output.data['text/plain']) {
                                const text = Array.isArray(output.data['text/plain']) ? 
                                    output.data['text/plain'].join('') : output.data['text/plain'];
                                notebookHtml += `
                                    <pre class="output-result p-2 bg-gray-800 rounded">${text}</pre>
                                `;
                            }
                        } else if (output.output_type === 'error') {
                            notebookHtml += `
                                <div class="output-error p-2 bg-red-900 text-red-300 rounded">
                                    <strong>${output.ename}: ${output.evalue}</strong>
                                    ${output.traceback ? 
                                        `<pre class="mt-2">${output.traceback.join('\n')}</pre>` : ''}
                                </div>
                            `;
                        }
                    });
                    
                    notebookHtml += `</div>`;
                }
                
                notebookHtml += `</div>`;
            }
            
            notebookHtml += `</div>`;
        });
    } else {
        notebookHtml += `<p class="text-gray-400">This notebook has no cells.</p>`;
    }
    
    notebookHtml += `
            </div>
        </div>
    `;
    
    container.innerHTML = notebookHtml;
    
    // Highlight code blocks
    if (typeof Prism !== 'undefined') {
        Prism.highlightAllUnder(container);
    }
}

// Function to load script content
function loadScript(path) {
    const contentContainer = document.getElementById('file-content');
    if (!contentContainer) return;
    
    contentContainer.innerHTML = `
        <div class="p-4">
            <div class="flex items-center mb-4">
                <i class="fas fa-terminal text-cyan-400 mr-2"></i>
                <h3 class="text-xl font-semibold break-all">${path}</h3>
            </div>
            <div class="loading-indicator">
                <i class="fas fa-spinner fa-spin mr-2"></i> Loading script...
            </div>
        </div>
    `;
    
    fetch(path)
        .then(response => {
            if (!response.ok) {
                throw new Error('Could not load script');
            }
            return response.text();
        })
        .then(data => {
            contentContainer.innerHTML = `
                <div class="p-4">
                    <div class="flex items-center mb-4">
                        <i class="fas fa-terminal text-cyan-400 mr-2"></i>
                        <h3 class="text-xl font-semibold break-all">${path}</h3>
                    </div>
                    <pre class="language-bash"><code class="language-bash">${data}</code></pre>
                </div>
            `;
            
            // Highlight code
            if (typeof Prism !== 'undefined') {
                Prism.highlightAllUnder(contentContainer);
            }
        })
        .catch(error => {
            contentContainer.innerHTML = `
                <div class="p-4">
                    <div class="flex items-center mb-4">
                        <i class="fas fa-exclamation-triangle text-red-500 mr-2"></i>
                        <h3 class="text-xl font-semibold">Error Loading Script</h3>
                    </div>
                    <p class="text-red-400">${error.message}</p>
                    <p class="mt-4">Please make sure the file exists and is accessible.</p>
                </div>
            `;
        });
}

// Function to load Python file content
function loadPythonFile(path) {
    const contentContainer = document.getElementById('file-content');
    if (!contentContainer) return;
    
    contentContainer.innerHTML = `
        <div class="p-4">
            <div class="flex items-center mb-4">
                <i class="fas fa-file-code text-cyan-400 mr-2"></i>
                <h3 class="text-xl font-semibold break-all">${path}</h3>
            </div>
            <div class="loading-indicator">
                <i class="fas fa-spinner fa-spin mr-2"></i> Loading file...
            </div>
        </div>
    `;
    
    fetch(path)
        .then(response => {
            if (!response.ok) {
                throw new Error('Could not load file');
            }
            return response.text();
        })
        .then(data => {
            contentContainer.innerHTML = `
                <div class="p-4">
                    <div class="flex items-center mb-4">
                        <i class="fas fa-file-code text-cyan-400 mr-2"></i>
                        <h3 class="text-xl font-semibold break-all">${path}</h3>
                    </div>
                    <pre class="language-python"><code class="language-python">${data}</code></pre>
                </div>
            `;
            
            // Highlight code
            if (typeof Prism !== 'undefined') {
                Prism.highlightAllUnder(contentContainer);
            }
        })
        .catch(error => {
            contentContainer.innerHTML = `
                <div class="p-4">
                    <div class="flex items-center mb-4">
                        <i class="fas fa-exclamation-triangle text-red-500 mr-2"></i>
                        <h3 class="text-xl font-semibold">Error Loading File</h3>
                    </div>
                    <p class="text-red-400">${error.message}</p>
                    <p class="mt-4">Please make sure the file exists and is accessible.</p>
                </div>
            `;
        });
}

// Initialize the file tree when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const treeContainer = document.getElementById('file-tree');
    if (treeContainer) {
        // First, render the hardcoded tree immediately
        createTreeView(treeContainer, defaultFileStructure);
        
        // Then try to fetch the JSON file to update the tree
        fetch('assets/data/python-files.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Could not load file list');
                }
                return response.json();
            })
            .then(data => {
                // Only update if we got valid data
                if (data && (data.files || data.folders)) {
                    treeContainer.innerHTML = ''; // Clear the hardcoded tree
                    createTreeView(treeContainer, data); // Create the new tree
                }
            })
            .catch(error => {
                console.error('Error loading file tree:', error);
                // We already have the hardcoded tree, so no need to do anything
            });
    }
    
    // Expand the courses folder by default
    setTimeout(() => {
        const coursesFolder = document.querySelector('.tree-node-content .tree-node-label');
        if (coursesFolder && coursesFolder.textContent === 'courses') {
            const folderContent = coursesFolder.parentElement;
            if (folderContent) {
                toggleTreeNode(folderContent);
            }
        }
    }, 100);
    
    // Add window resize handler to adjust layout
    window.addEventListener('resize', function() {
        // If we're on mobile and switching to desktop, reset any mobile-specific styles
        if (window.innerWidth >= 768) {
            const fileTree = document.getElementById('file-tree');
            const fileContent = document.getElementById('file-content');
            
            if (fileTree) {
                fileTree.style.maxHeight = 'none';
            }
            
            if (fileContent) {
                fileContent.style.minHeight = '400px';
            }
        }
    });

    // Tree toggle functionality
    const treeToggleBtn = document.getElementById('tree-toggle');
    const fileExplorer = document.querySelector('.file-explorer');
    const fileTree = document.getElementById('file-tree');
    const fileContent = document.getElementById('file-content');
    
    if (treeToggleBtn && fileExplorer && fileTree && fileContent) {
        treeToggleBtn.addEventListener('click', function() {
            const isCollapsed = fileExplorer.classList.toggle('tree-collapsed');
            
            // Change icon based on state
            const icon = this.querySelector('i');
            
            if (isCollapsed) {
                // Collapse tree
                icon.classList.remove('fa-angle-double-left');
                icon.classList.add('fa-angle-double-right');
                
                // Hide tree completely
                fileTree.style.width = '0';
                fileTree.style.minWidth = '0';
                fileTree.style.padding = '0';
                fileTree.style.margin = '0';
                fileTree.style.border = 'none';
                fileTree.style.opacity = '0';
                fileTree.style.display = 'none'; // Completely hide it
                
                // Maximize content area
                fileContent.style.width = '100%';
                fileContent.style.maxWidth = '100%';
                fileContent.style.flex = '1';
                
                // Move button to left edge
                this.style.left = '0';
            } else {
                // Expand tree
                icon.classList.remove('fa-angle-double-right');
                icon.classList.add('fa-angle-double-left');
                
                // Show tree
                fileTree.style.display = 'block';
                fileTree.style.width = '300px';
                fileTree.style.minWidth = '300px';
                fileTree.style.padding = '20px';
                fileTree.style.margin = '';
                fileTree.style.border = '';
                fileTree.style.opacity = '1';
                
                // Restore content area
                fileContent.style.width = '';
                fileContent.style.maxWidth = '';
                
                // Move button back
                this.style.left = '300px';
            }
        });
    }
});

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('show');
            
            // Change icon based on menu state
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('show')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close menu when a link is clicked
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('show');
                    const icon = mobileMenuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
    
    // Handle active link state for index.html
    if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
        const sections = document.querySelectorAll('section[id]');
        
        function highlightNavLink() {
            const scrollY = window.pageYOffset;
            
            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;
                const sectionId = section.getAttribute('id');
                
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelector(`.nav-link[href="#${sectionId}"]`).classList.add('active');
                } else {
                    document.querySelector(`.nav-link[href="#${sectionId}"]`).classList.remove('active');
                }
            });
        }
        
        window.addEventListener('scroll', highlightNavLink);
        highlightNavLink(); // Run once on page load
    }
});