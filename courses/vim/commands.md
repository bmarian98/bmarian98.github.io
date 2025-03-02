# Vim Commands Cheat Sheet

## Basic Navigation

| Command | Description | Example |
|---------|-------------|---------|
| `h` | Move cursor left | In normal mode, press `h` to move left one character |
| `j` | Move cursor down | In normal mode, press `j` to move down one line |
| `k` | Move cursor up | In normal mode, press `k` to move up one line |
| `l` | Move cursor right | In normal mode, press `l` to move right one character |
| `w` | Move to start of next word | In normal mode, press `w` to jump to the next word |
| `b` | Move to start of previous word | In normal mode, press `b` to jump back one word |
| `e` | Move to end of word | In normal mode, press `e` to jump to the end of the current word |
| `0` | Move to start of line | In normal mode, press `0` to jump to the beginning of the line |
| `$` | Move to end of line | In normal mode, press `$` to jump to the end of the line |
| `gg` | Move to first line of document | In normal mode, type `gg` to jump to the top of the file |
| `G` | Move to last line of document | In normal mode, press `G` to jump to the bottom of the file |
| `:n` | Jump to line n | Type `:10` to jump to line 10 |

## Editing

| Command | Description | Example |
|---------|-------------|---------|
| `i` | Insert mode (before cursor) | Press `i` to start typing at the current position |
| `I` | Insert at beginning of line | Press `I` to start typing at the beginning of the line |
| `a` | Append (after cursor) | Press `a` to start typing after the current position |
| `A` | Append at end of line | Press `A` to start typing at the end of the line |
| `o` | Open new line below | Press `o` to create and edit a new line below current line |
| `O` | Open new line above | Press `O` to create and edit a new line above current line |
| `r` | Replace single character | Press `r` then type a character to replace the current character |
| `R` | Replace mode | Press `R` to start overwriting existing text |
| `x` | Delete character under cursor | Press `x` to delete the character at the cursor |
| `dd` | Delete line | Type `dd` to delete the current line |
| `dw` | Delete word | Type `dw` to delete from cursor to the end of the word |
| `d$` | Delete to end of line | Type `d$` to delete from cursor to the end of the line |
| `yy` | Yank (copy) line | Type `yy` to copy the current line |
| `yw` | Yank word | Type `yw` to copy from cursor to the end of the word |
| `p` | Paste after cursor | Press `p` to paste the copied or deleted text after the cursor |
| `P` | Paste before cursor | Press `P` to paste the copied or deleted text before the cursor |
| `u` | Undo | Press `u` to undo the last change |
| `Ctrl+r` | Redo | Press `Ctrl+r` to redo the last undone change |

## Visual Mode

| Command | Description | Example |
|---------|-------------|---------|
| `v` | Visual mode (character) | Press `v` to select characters |
| `V` | Visual mode (line) | Press `V` to select entire lines |
| `Ctrl+v` | Visual block mode | Press `Ctrl+v` to select a block of text |
| `>` | Indent selected text | Select text with visual mode, then press `>` to indent |
| `<` | Unindent selected text | Select text with visual mode, then press `<` to unindent |
| `y` | Yank (copy) selected text | Select text with visual mode, then press `y` to copy |
| `d` | Delete selected text | Select text with visual mode, then press `d` to delete |

## Search and Replace

| Command | Description | Example |
|---------|-------------|---------|
| `/pattern` | Search forward for pattern | Type `/hello` to find the next occurrence of "hello" |
| `?pattern` | Search backward for pattern | Type `?hello` to find the previous occurrence of "hello" |
| `n` | Repeat search forward | After searching, press `n` to find the next match |
| `N` | Repeat search backward | After searching, press `N` to find the previous match |
| `:%s/old/new/g` | Replace all occurrences | Type `:%s/foo/bar/g` to replace all "foo" with "bar" |
| `:s/old/new/g` | Replace in current line | Type `:s/foo/bar/g` to replace all "foo" with "bar" in the current line |

## File Operations

| Command | Description | Example |
|---------|-------------|---------|
| `:w` | Save file | Type `:w` to save the current file |
| `:w filename` | Save as | Type `:w newfile.txt` to save as "newfile.txt" |
| `:q` | Quit | Type `:q` to exit Vim (fails if unsaved changes) |
| `:q!` | Quit without saving | Type `:q!` to force exit without saving changes |
| `:wq` | Save and quit | Type `:wq` to save and exit |
| `:e filename` | Edit file | Type `:e file.txt` to open "file.txt" |
| `:split filename` | Split window horizontally | Type `:split file.txt` to open "file.txt" in a horizontal split |
| `:vsplit filename` | Split window vertically | Type `:vsplit file.txt` to open "file.txt" in a vertical split |

## Multiple Windows

| Command | Description | Example |
|---------|-------------|---------|
| `Ctrl+w s` | Split window horizontally | Press `Ctrl+w` then `s` to split the current window horizontally |
| `Ctrl+w v` | Split window vertically | Press `Ctrl+w` then `v` to split the current window vertically |
| `Ctrl+w w` | Switch between windows | Press `Ctrl+w` then `w` to cycle through windows |
| `Ctrl+w h` | Move to window left | Press `Ctrl+w` then `h` to move to the window on the left |
| `Ctrl+w j` | Move to window below | Press `Ctrl+w` then `j` to move to the window below |
| `Ctrl+w k` | Move to window above | Press `Ctrl+w` then `k` to move to the window above |
| `Ctrl+w l` | Move to window right | Press `Ctrl+w` then `l` to move to the window on the right |
| `Ctrl+w c` | Close window | Press `Ctrl+w` then `c` to close the current window |
| `Ctrl+w o` | Close all other windows | Press `Ctrl+w` then `o` to close all windows except the current one |

## Macros

| Command | Description | Example |
|---------|-------------|---------|
| `qa` | Record macro a | Press `qa` to start recording a macro named 'a' |
| `q` | Stop recording | Press `q` to stop recording the macro |
| `@a` | Run macro a | Press `@a` to execute the macro named 'a' |
| `@@` | Repeat last macro | Press `@@` to repeat the last executed macro |

## Tips and Tricks

1. **Repeat Actions**: Use the number prefix to repeat commands (e.g., `5dd` deletes 5 lines)
2. **Combine Commands**: Vim commands can be combined (e.g., `daw` deletes a word)
3. **Markers**: Use `m` followed by a letter to set a marker, and `'` followed by the letter to jump to it
4. **Command History**: Press `:` and use up/down arrows to navigate command history
5. **Auto-completion**: In insert mode, press `Ctrl+n` or `Ctrl+p` for word completion