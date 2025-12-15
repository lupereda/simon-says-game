# Simon Says Game - AI Coding Guidelines

## Project Overview
This is a web-based Simon Says memory game built with HTML5, CSS, and vanilla JavaScript. The game challenges players to repeat increasingly complex sequences of colored buttons.

## Architecture
- **index.html**: Main game interface with colored buttons and score display
- **css/style.css**: Game styling and animations
- **css/reset.css**: CSS reset for consistent cross-browser rendering (box-sizing: border-box, font-family: Arial)
- **js/app.js**: Game logic, sequence generation, and user interaction handling

## Key Patterns
- DOM manipulation using `querySelector` and `querySelectorAll`
- Game state managed through JavaScript objects (current sequence array, player input tracking)
- Event listeners attached to button elements for click handling
- Audio feedback via Web Audio API or `<audio>` elements
- CSS transitions for button press animations and visual feedback

## Development Workflow
- No build tools required; serve files statically and open index.html in browser
- Debug by inspecting DOM elements and using browser console for game state logging
- Test sequences by manually triggering button events in dev tools

## Conventions
- Buttons use `data-color` attributes for identification (e.g., `data-color="red"`)
- Function names in camelCase (e.g., `generateSequence`, `checkPlayerInput`)
- CSS classes avoid generic names; use game-specific prefixes like `.game-button`

## Examples
- Sequence generation: `const sequence = []; for (let i = 0; i < level; i++) { sequence.push(colors[Math.floor(Math.random() * colors.length)]); }`
- Button interaction: `button.addEventListener('click', (e) => { const color = e.target.dataset.color; playSound(color); validateInput(color); });`

## Integration Points
- External dependencies: None (vanilla JS)
- Cross-component communication: Direct DOM queries and event bubbling