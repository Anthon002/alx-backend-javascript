/**
 * module to write out name
 */
process.stdout.write('Welcome to Holberton School, what is your name?\n');

process.stdin.on('readable', () => {
  const piece = process.stdin.read();

  if (piece) {
    process.stdout.write(`Your name is: ${piece}`);
  }
});

process.stdin.on('end', () => {
  process.stdout.write('This important software is now closing\n');
});
