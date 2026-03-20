const form = document.getElementById('form');
const output = document.getElementById('output');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const length = document.getElementById('length').value;
  const symbols = document.getElementById('symbols').checked;
  const noLower = document.getElementById('noLower').checked;
  const noUpper = document.getElementById('noUpper').checked;
  const noDigits = document.getElementById('noDigits').checked;

  const q = new URLSearchParams({
    length,
    symbols: symbols.toString(),
    noLower: noLower.toString(),
    noUpper: noUpper.toString(),
    noDigits: noDigits.toString(),
  });

  try {
    const res = await fetch(`/api/password?${q.toString()}`);
    const data = await res.json();

    if (!res.ok) {
      output.textContent = `Error: ${data.error || 'Unknown error'}`;
      output.style.color = 'red';
      return;
    }

    output.textContent = data.password;
    output.style.color = 'green';
  } catch (error) {
    output.textContent = `Request failed: ${error.message}`;
    output.style.color = 'red';
  }
});
