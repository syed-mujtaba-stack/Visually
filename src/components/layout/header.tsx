
'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';

export function Header() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/');
  };
  
  const buttonStyle = "transition-all duration-300 hover:shadow-[0_0_15px_hsl(var(--accent)/0.7)] hover:text-accent-foreground hover:bg-accent";

  return (
    <header className="relative z-20 bg-background/80 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary"><path d="m12 3-1.41 1.41L16.17 10H4v4h12.17l-5.58 5.59L12 21l8-8-8-8z"/></svg>
          <span className="text-xl font-bold font-headline">Visually</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="text-muted-foreground transition-colors hover:text-foreground">Home</Link>
          <Link href="/about" className="text-muted-foreground transition-colors hover:text-foreground">About</Link>
          <Link href="/contact" className="text-muted-foreground transition-colors hover:text-foreground">Contact</Link>
          <Link href="/prompts" className="text-muted-foreground transition-colors hover:text-foreground">Prompts</Link>
          <Link href="/blogs" className="text-muted-foreground transition-colors hover:text-foreground">Blogs</Link>
        </nav>
        <div className="flex items-center gap-4">
          {!loading && (
            user ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                            <Avatar className='h-10 w-10'>
                                <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? 'User'} />
                                <AvatarFallback>{user.email?.[0].toUpperCase()}</AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">{user.displayName}</p>
                                <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleSignOut}>
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
              <>
                <Button asChild variant="ghost" className={buttonStyle}>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild className={buttonStyle}>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )
          )}
        </div>
      </div>
    </header>
  );
}
