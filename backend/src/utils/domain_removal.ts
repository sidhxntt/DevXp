function getEmailPrefix(email: string): string {
  if (!email || typeof email !== 'string') {
    throw new Error('Invalid email provided');
  }

  const prefix = email.split('@')[0];
  const first_letter = prefix[0].toUpperCase();
  return first_letter + prefix.slice(1);
}

export default getEmailPrefix;

