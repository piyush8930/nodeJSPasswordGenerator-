# Random Password Creator (Node.js)

A simple CLI password generator that supports length and character set options.

## Usage

1. Install dependencies:

```bash
npm install
```

2. Run:

```bash
npm start
```

3. Open browser at `http://localhost:3000`

3. Options:

- `-l, --length <n>`: set password length (default: 16)
- `--no-lower`: exclude lowercase letters
- `--no-upper`: exclude uppercase letters
- `--no-digits`: exclude digits
- `-s, --symbols`: include symbols
- `-h, --help`: show help

## Examples

```bash
node index.js -l 24 -s
node index.js --no-digits
"```
