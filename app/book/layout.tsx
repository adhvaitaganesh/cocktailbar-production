import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book Your Event | Craft Cocktail Collective',
  description: 'Book our premium cocktail catering services for your next event. Professional bartenders, custom menus, and full-service setup.',
};

export default function BookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}