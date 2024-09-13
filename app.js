let bingoItems = [];
const bingoGrid = document.getElementById('bingoGrid');
const bingoInput = document.getElementById('bingoInput');

// Add item to bingo grid
bingoInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && bingoInput.value.trim()) {
    const newItem = bingoInput.value.trim();
    bingoItems.push(newItem);
    generateBingoGrid();
    bingoInput.value = '';
  }
});

// Generate bingo grid
function generateBingoGrid() {
  bingoGrid.innerHTML = '';
  bingoItems.forEach((item, index) => {
    const cell = document.createElement('div');
    cell.classList.add('bingo-cell');
    cell.textContent = item;

    // Mark as checked on single click
    cell.addEventListener('click', () => {
      cell.classList.toggle('checked');
    });

    // Edit item on double-click
    cell.addEventListener('dblclick', () => {
      const newItem = prompt('Edit this item:', item);
      if (newItem !== null && newItem.trim()) {
        bingoItems[index] = newItem.trim();
        generateBingoGrid();
      }
    });

    bingoGrid.appendChild(cell);
  });
}

// Save Bingo grid to localStorage
function saveBingo() {
  localStorage.setItem('bingoItems', JSON.stringify(bingoItems));
  alert('Bingo saved!');
}

// Load Bingo grid from localStorage
function loadBingo() {
  const savedBingo = localStorage.getItem('bingoItems');
  if (savedBingo) {
    bingoItems = JSON.parse(savedBingo);
    generateBingoGrid();
  } else {
    alert('No saved Bingo found.');
  }
}

// Clear Bingo grid
function clearBingo() {
  bingoItems = [];
  generateBingoGrid();
}

// Notepad Save
function saveNote() {
  const notepadContent = document.getElementById('notepad').value;
  localStorage.setItem('notepadContent', notepadContent);
  alert('Note saved!');
}

// Load saved notepad content on page load
window.onload = function () {
  const savedNote = localStorage.getItem('notepadContent');
  if (savedNote) {
    document.getElementById('notepad').value = savedNote;
  }

  // Load saved Bingo on page load
  loadBingo();
};
