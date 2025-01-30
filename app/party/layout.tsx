import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Party Atmosphere | cheers 23',
  description: 'Experience the perfect party atmosphere with cheers 23 premium cocktail catering.',
};

export default function PartyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}