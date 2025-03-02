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
                },
                {
                    "name": "vim",
                    "icon": "fa-keyboard",
                    "files": [
                        {
                            "name": "commands.md",
                            "path": "courses/vim/commands.md",
                            "type": "markdown"
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
    
    // Always use folder icon for all folders, regardless of custom icon attribute
    const folderIcon = document.createElement('i');
    folderIcon.className = 'fas fa-folder tree-node-icon text-sm';
    
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
            // Still use custom icons for files, just not for folders
            let customIconType = '';
            if (folder.icon) {
                customIconType = folder.icon;
            } else if (folder.name.toLowerCase() === 'python') {
                customIconType = 'fa-python';
            } else if (folder.name.toLowerCase() === 'bash') {
                customIconType = 'fa-terminal';
            }
            
            const fileNode = createFileNode(file, customIconType, folder.name);
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
        fileIcon.className = 'fab fa-python tree-node-icon file-icon-python text-sm';
    } else if (file.type === 'script' && folderName === 'bash' && folderIcon === 'fa-terminal') {
        fileIcon.className = 'fas fa-terminal tree-node-icon file-icon-bash text-sm';
    } else if (file.type === 'markdown') {
        fileIcon.className = 'fas fa-file-alt tree-node-icon markdown-icon text-sm';
    } else if (file.type === 'notebook') {
        fileIcon.className = 'fas fa-book-open tree-node-icon notebook-icon text-sm';
    } else if (file.type === 'script') {
        fileIcon.className = 'fas fa-file-code tree-node-icon script-icon text-sm';
    } else {
        fileIcon.className = 'fas fa-file tree-node-icon file-icon text-sm';
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
        } else if (file.type === 'script') {
            loadScript(file.path);
        } else if (file.type === 'markdown') {
            loadMarkdown(file.path);
        } else {
            loadPythonFile(file.path);
        }
        
        // On mobile, scroll to the content area
        if (window.innerWidth < 768) {
            const contentArea = document.getElementById('file-content');
            if (contentArea) {
                setTimeout(() => {
                    contentArea.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        }
    });
    
    return fileNode;
}

// Function to toggle tree node expansion
function toggleTreeNode(nodeContent) {
    const isExpanded = nodeContent.getAttribute('data-expanded') === 'true';
    const node = nodeContent.parentElement;
    const icon = nodeContent.querySelector('i.tree-node-icon');
    
    if (isExpanded) {
        // Collapse
        nodeContent.setAttribute('data-expanded', 'false');
        // Always use folder icon when collapsed
        icon.className = 'fas fa-folder tree-node-icon text-sm';
        
        // Find and hide children container
        const childrenContainer = node.querySelector('.tree-children');
        if (childrenContainer) {
            childrenContainer.style.display = 'none';
        }
    } else {
        // Expand
        nodeContent.setAttribute('data-expanded', 'true');
        // Always use folder-open icon when expanded
        icon.className = 'fas fa-folder-open tree-node-icon text-sm';
        
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
    
    // Remove 'courses/' from the displayed path
    const displayPath = path.replace(/^courses\//, '');
    
    contentContainer.innerHTML = `
        <div class="p-4">
            <div class="flex items-center mb-4">
                <i class="fas fa-book-open text-cyan-400 mr-2 text-sm"></i> <!-- Smaller icon -->
                <h3 class="text-xl font-semibold break-all">${displayPath}</h3>
            </div>
            <div class="loading-indicator">
                <i class="fas fa-spinner fa-spin mr-2 text-sm"></i> <!-- Smaller icon -->
                Loading notebook...
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

// Add this helper function to create a copy button
function createCopyButton(codeElement) {
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-gray-300 p-1 rounded text-xs';
    copyButton.innerHTML = '<i class="fas fa-copy mr-1"></i> Copy';
    
    copyButton.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event bubbling
        
        // Get the code text
        const code = codeElement.textContent;
        
        // Copy to clipboard
        navigator.clipboard.writeText(code).then(() => {
            // Change button text temporarily
            const originalText = copyButton.innerHTML;
            copyButton.innerHTML = '<i class="fas fa-check mr-1"></i> Copied!';
            copyButton.classList.add('bg-green-700');
            copyButton.classList.remove('bg-gray-700');
            
            // Reset button after 2 seconds
            setTimeout(() => {
                copyButton.innerHTML = originalText;
                copyButton.classList.remove('bg-green-700');
                copyButton.classList.add('bg-gray-700');
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
            copyButton.innerHTML = '<i class="fas fa-times mr-1"></i> Failed';
            copyButton.classList.add('bg-red-700');
            copyButton.classList.remove('bg-gray-700');
            
            setTimeout(() => {
                copyButton.innerHTML = '<i class="fas fa-copy mr-1"></i> Copy';
                copyButton.classList.remove('bg-red-700');
                copyButton.classList.add('bg-gray-700');
            }, 2000);
        });
    });
    
    return copyButton;
}

// Function to render notebook content
function renderNotebook(notebook, container, path) {
    // Remove 'courses/' from the displayed path
    const displayPath = path.replace(/^courses\//, '');
    
    let notebookHtml = `
        <div class="p-4">
            <div class="flex items-center mb-4">
                <i class="fas fa-book-open text-cyan-400 mr-2 text-sm"></i>
                <h3 class="text-xl font-semibold break-all">${displayPath}</h3>
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
                
                // Source code with copy button
                if (cell.source) {
                    const source = Array.isArray(cell.source) ? cell.source.join('') : cell.source;
                    notebookHtml += `
                        <div class="relative">
                            <button class="copy-button absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-gray-300 p-1 rounded text-xs" data-code="${encodeURIComponent(source)}">
                                <i class="fas fa-copy mr-1"></i> Copy
                            </button>
                            <pre class="language-python"><code class="language-python">${source}</code></pre>
                        </div>
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
                                <div class="relative">
                                    <button class="copy-button absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-gray-300 p-1 rounded text-xs" data-code="${encodeURIComponent(text)}">
                                        <i class="fas fa-copy mr-1"></i> Copy
                                    </button>
                                    <pre class="output-stream p-2 bg-gray-800 rounded">${text}</pre>
                                </div>
                            `;
                        } else if (output.output_type === 'execute_result' || output.output_type === 'display_data') {
                            if (output.data && output.data['text/plain']) {
                                const text = Array.isArray(output.data['text/plain']) ? 
                                    output.data['text/plain'].join('') : output.data['text/plain'];
                                notebookHtml += `
                                    <div class="relative">
                                        <button class="copy-button absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-gray-300 p-1 rounded text-xs" data-code="${encodeURIComponent(text)}">
                                            <i class="fas fa-copy mr-1"></i> Copy
                                        </button>
                                        <pre class="output-result p-2 bg-gray-800 rounded">${text}</pre>
                                    </div>
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
    
    // Add event listeners to copy buttons
    const copyButtons = container.querySelectorAll('.copy-button');
    copyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent event bubbling
            
            // Get the code from the data attribute
            const code = decodeURIComponent(this.getAttribute('data-code'));
            
            // Copy to clipboard
            navigator.clipboard.writeText(code).then(() => {
                // Change button text temporarily
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check mr-1"></i> Copied!';
                this.classList.add('bg-green-700');
                this.classList.remove('bg-gray-700');
                
                // Reset button after 2 seconds
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.classList.remove('bg-green-700');
                    this.classList.add('bg-gray-700');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
                this.innerHTML = '<i class="fas fa-times mr-1"></i> Failed';
                this.classList.add('bg-red-700');
                this.classList.remove('bg-gray-700');
                
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-copy mr-1"></i> Copy';
                    this.classList.remove('bg-red-700');
                    this.classList.add('bg-gray-700');
                }, 2000);
            });
        });
    });
    
    // Highlight code blocks
    if (typeof Prism !== 'undefined') {
        Prism.highlightAllUnder(container);
    }
}

// Function to load script content
function loadScript(path) {
    const contentContainer = document.getElementById('file-content');
    if (!contentContainer) return;
    
    // Remove 'courses/' from the displayed path
    const displayPath = path.replace(/^courses\//, '');
    
    contentContainer.innerHTML = `
        <div class="p-4">
            <div class="flex items-center mb-4">
                <i class="fas fa-terminal text-cyan-400 mr-2 text-sm"></i>
                <h3 class="text-xl font-semibold break-all">${displayPath}</h3>
            </div>
            <div class="loading-indicator">
                <i class="fas fa-spinner fa-spin mr-2 text-sm"></i>
                Loading script...
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
                        <i class="fas fa-terminal text-cyan-400 mr-2 text-sm"></i>
                        <h3 class="text-xl font-semibold break-all">${displayPath}</h3>
                    </div>
                    <div class="relative">
                        <button class="copy-button absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-gray-300 p-1 rounded text-xs" data-code="${encodeURIComponent(data)}">
                            <i class="fas fa-copy mr-1"></i> Copy
                        </button>
                        <pre class="language-bash"><code class="language-bash">${data}</code></pre>
                    </div>
                </div>
            `;
            
            // Add event listener to copy button
            const copyButton = contentContainer.querySelector('.copy-button');
            if (copyButton) {
                copyButton.addEventListener('click', function(e) {
                    e.stopPropagation();
                    
                    const code = decodeURIComponent(this.getAttribute('data-code'));
                    
                    navigator.clipboard.writeText(code).then(() => {
                        const originalText = this.innerHTML;
                        this.innerHTML = '<i class="fas fa-check mr-1"></i> Copied!';
                        this.classList.add('bg-green-700');
                        this.classList.remove('bg-gray-700');
                        
                        setTimeout(() => {
                            this.innerHTML = originalText;
                            this.classList.remove('bg-green-700');
                            this.classList.add('bg-gray-700');
                        }, 2000);
                    }).catch(err => {
                        console.error('Failed to copy: ', err);
                        this.innerHTML = '<i class="fas fa-times mr-1"></i> Failed';
                        this.classList.add('bg-red-700');
                        this.classList.remove('bg-gray-700');
                        
                        setTimeout(() => {
                            this.innerHTML = '<i class="fas fa-copy mr-1"></i> Copy';
                            this.classList.remove('bg-red-700');
                            this.classList.add('bg-gray-700');
                        }, 2000);
                    });
                });
            }
            
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
                    <div class="relative">
                        <button class="copy-button absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-gray-300 p-1 rounded text-xs" data-code="${encodeURIComponent(data)}">
                            <i class="fas fa-copy mr-1"></i> Copy
                        </button>
                        <pre class="language-python"><code class="language-python">${data}</code></pre>
                    </div>
                </div>
            `;
            
            // Add event listener to copy button
            const copyButton = contentContainer.querySelector('.copy-button');
            if (copyButton) {
                copyButton.addEventListener('click', function(e) {
                    e.stopPropagation();
                    
                    const code = decodeURIComponent(this.getAttribute('data-code'));
                    
                    navigator.clipboard.writeText(code).then(() => {
                        const originalText = this.innerHTML;
                        this.innerHTML = '<i class="fas fa-check mr-1"></i> Copied!';
                        this.classList.add('bg-green-700');
                        this.classList.remove('bg-gray-700');
                        
                        setTimeout(() => {
                            this.innerHTML = originalText;
                            this.classList.remove('bg-green-700');
                            this.classList.add('bg-gray-700');
                        }, 2000);
                    }).catch(err => {
                        console.error('Failed to copy: ', err);
                        this.innerHTML = '<i class="fas fa-times mr-1"></i> Failed';
                        this.classList.add('bg-red-700');
                        this.classList.remove('bg-gray-700');
                        
                        setTimeout(() => {
                            this.innerHTML = '<i class="fas fa-copy mr-1"></i> Copy';
                            this.classList.remove('bg-red-700');
                            this.classList.add('bg-gray-700');
                        }, 2000);
                    });
                });
            }
            
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

// Add a new function to load markdown content
function loadMarkdown(path) {
    const contentContainer = document.getElementById('file-content');
    if (!contentContainer) return;
    
    // Remove 'courses/' from the displayed path
    const displayPath = path.replace(/^courses\//, '');
    
    contentContainer.innerHTML = `
        <div class="p-4">
            <div class="flex items-center mb-4">
                <i class="fas fa-file-alt text-cyan-400 mr-2 text-sm"></i>
                <h3 class="text-xl font-semibold break-all">${displayPath}</h3>
            </div>
            <div class="loading-indicator">
                <i class="fas fa-spinner fa-spin mr-2 text-sm"></i>
                Loading markdown...
            </div>
        </div>
    `;
    
    fetch(path)
        .then(response => {
            if (!response.ok) {
                throw new Error('Could not load markdown file');
            }
            return response.text();
        })
        .then(data => {
            contentContainer.innerHTML = `
                <div class="p-4">
                    <div class="flex items-center mb-4">
                        <i class="fas fa-file-alt text-cyan-400 mr-2 text-sm"></i>
                        <h3 class="text-xl font-semibold break-all">${displayPath}</h3>
                    </div>
                    <div class="markdown-content">
                        <div class="relative">
                            <button class="copy-button absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-gray-300 p-1 rounded text-xs" data-code="${encodeURIComponent(data)}">
                                <i class="fas fa-copy mr-1"></i> Copy All
                            </button>
                            <div class="markdown-body p-4 bg-gray-800 rounded">${renderMarkdownToHTML(data)}</div>
                        </div>
                    </div>
                </div>
            `;
            
            // Add event listener to copy button
            const copyButton = contentContainer.querySelector('.copy-button');
            if (copyButton) {
                copyButton.addEventListener('click', function(e) {
                    e.stopPropagation();
                    
                    const code = decodeURIComponent(this.getAttribute('data-code'));
                    
                    navigator.clipboard.writeText(code).then(() => {
                        const originalText = this.innerHTML;
                        this.innerHTML = '<i class="fas fa-check mr-1"></i> Copied!';
                        this.classList.add('bg-green-700');
                        this.classList.remove('bg-gray-700');
                        
                        setTimeout(() => {
                            this.innerHTML = originalText;
                            this.classList.remove('bg-green-700');
                            this.classList.add('bg-gray-700');
                        }, 2000);
                    }).catch(err => {
                        console.error('Failed to copy: ', err);
                        this.innerHTML = '<i class="fas fa-times mr-1"></i> Failed';
                        this.classList.add('bg-red-700');
                        this.classList.remove('bg-gray-700');
                        
                        setTimeout(() => {
                            this.innerHTML = '<i class="fas fa-copy mr-1"></i> Copy All';
                            this.classList.remove('bg-red-700');
                            this.classList.add('bg-gray-700');
                        }, 2000);
                    });
                });
            }
            
            // Add copy buttons to code blocks in the markdown
            addCopyButtonsToCodeBlocks();
        })
        .catch(error => {
            contentContainer.innerHTML = `
                <div class="p-4">
                    <div class="flex items-center mb-4">
                        <i class="fas fa-exclamation-triangle text-red-500 mr-2"></i>
                        <h3 class="text-xl font-semibold">Error Loading Markdown</h3>
                    </div>
                    <p class="text-red-400">${error.message}</p>
                    <p class="mt-4">Please make sure the file exists and is accessible.</p>
                </div>
            `;
        });
}

// Simple function to convert markdown to HTML
function renderMarkdownToHTML(markdown) {
    // This is a very basic markdown renderer
    // For a real implementation, consider using a library like marked.js
    
    // Convert headers
    let html = markdown
        .replace(/^# (.*$)/gm, '<h1 class="text-2xl font-bold mt-6 mb-4">$1</h1>')
        .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-5 mb-3">$1</h2>')
        .replace(/^### (.*$)/gm, '<h3 class="text-lg font-bold mt-4 mb-2">$1</h3>')
        .replace(/^#### (.*$)/gm, '<h4 class="text-base font-bold mt-3 mb-2">$1</h4>');
    
    // Convert tables
    html = html.replace(/\|(.+)\|/g, function(match) {
        const cells = match.split('|').filter(cell => cell.trim() !== '');
        return '<tr>' + cells.map(cell => `<td class="border border-gray-600 px-4 py-2">${cell.trim()}</td>`).join('') + '</tr>';
    });
    
    // Identify table sections
    html = html.replace(/<tr>(.+)<\/tr>\s*<tr>(-+\|)+<\/tr>/g, function(match, headerRow) {
        return '<table class="min-w-full bg-gray-700 rounded my-4"><thead class="bg-gray-800">' + 
               headerRow + '</thead><tbody>';
    });
    
    // Close tables
    html = html.replace(/<tbody>(.+?)(?=<h|$)/gs, function(match, tableBody) {
        return '<tbody>' + tableBody + '</tbody></table>';
    });
    
    // Convert bold
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert italic
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Convert code blocks
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, function(match, language, code) {
        const lang = language || 'plaintext';
        return `<pre class="relative bg-gray-900 rounded p-4 my-4"><code class="language-${lang}">${code}</code></pre>`;
    });
    
    // Convert inline code
    html = html.replace(/`([^`]+)`/g, '<code class="bg-gray-900 px-1 rounded">$1</code>');
    
    // Convert lists
    html = html.replace(/^\d+\. (.*$)/gm, '<li class="ml-6 list-decimal">$1</li>');
    html = html.replace(/^- (.*$)/gm, '<li class="ml-6 list-disc">$1</li>');
    
    // Group list items
    html = html.replace(/(<li[^>]*>.*<\/li>\n)+/g, function(match) {
        if (match.includes('list-decimal')) {
            return '<ol class="my-4">' + match + '</ol>';
        } else {
            return '<ul class="my-4">' + match + '</ul>';
        }
    });
    
    // Convert paragraphs
    html = html.replace(/^(?!<[hou]).+$/gm, function(match) {
        if (match.trim() === '') return '';
        return '<p class="my-3">' + match + '</p>';
    });
    
    return html;
}

// Function to add copy buttons to code blocks in markdown
function addCopyButtonsToCodeBlocks() {
    const codeBlocks = document.querySelectorAll('.markdown-body pre');
    
    codeBlocks.forEach(block => {
        const code = block.querySelector('code');
        if (code) {
            const copyButton = document.createElement('button');
            copyButton.className = 'copy-button absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-gray-300 p-1 rounded text-xs';
            copyButton.innerHTML = '<i class="fas fa-copy mr-1"></i> Copy';
            
            copyButton.addEventListener('click', function(e) {
                e.stopPropagation();
                
                const codeText = code.textContent;
                
                navigator.clipboard.writeText(codeText).then(() => {
                    const originalText = this.innerHTML;
                    this.innerHTML = '<i class="fas fa-check mr-1"></i> Copied!';
                    this.classList.add('bg-green-700');
                    this.classList.remove('bg-gray-700');
                    
                    setTimeout(() => {
                        this.innerHTML = originalText;
                        this.classList.remove('bg-green-700');
                        this.classList.add('bg-gray-700');
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                    this.innerHTML = '<i class="fas fa-times mr-1"></i> Failed';
                    this.classList.add('bg-red-700');
                    this.classList.remove('bg-gray-700');
                    
                    setTimeout(() => {
                        this.innerHTML = '<i class="fas fa-copy mr-1"></i> Copy';
                        this.classList.remove('bg-red-700');
                        this.classList.add('bg-gray-700');
                    }, 2000);
                });
            });
            
            block.style.position = 'relative';
            block.appendChild(copyButton);
        }
    });
}

// Initialize the file tree when the page loads
document.addEventListener('DOMContentLoaded', function() {
    const treeContainer = document.getElementById('file-tree');
    if (treeContainer) {
        // First, render the hardcoded tree immediately
        createTreeView(treeContainer, defaultFileStructure);
        
        // Then try to fetch the JSON file to update the tree
        fetch('assets/data/courses.json')
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