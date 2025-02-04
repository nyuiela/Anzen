import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/theme-toggle';
import {
  HardDriveIcon,
  MenuIcon,
  BarChart2,
  Bell,
  User,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useStore } from '@/lib/store';

export default function Navbar() {
  const { user } = useStore();

  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center px-4">
        <Link to="/" className="flex items-center space-x-2">
          <HardDriveIcon className="h-6 w-6 text-primary" />
          <span className="font-bold">OnchainVault</span>
        </Link>

        <div className="flex-1" />

        <div className="hidden md:flex md:items-center md:space-x-4">
          <Link to="/explore">
            <Button variant="ghost">Explore</Button>
          </Link>
          {user ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost">Dashboard</Button>
              </Link>
              <Link to="/analytics">
                <Button variant="ghost">
                  <BarChart2 className="h-4 w-4 mr-2" />
                  Analytics
                </Button>
              </Link>
              <Link to="/notifications">
                <Button variant="ghost">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </Button>
              </Link>
              <Link to="/upload">
                <Button>Upload</Button>
              </Link>
              <Link to={`/profile/${user.address}`}>
                <Button variant="ghost" size="icon">
                  <User className="h-4 w-4" />
                </Button>
              </Link>
            </>
          ) : (
            <Button>Connect Wallet</Button>
          )}
          <ModeToggle />
        </div>

        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MenuIcon className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to="/explore">Explore</Link>
              </DropdownMenuItem>
              {user ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/analytics">Analytics</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/notifications">Notifications</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/upload">Upload</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to={`/profile/${user.address}`}>Profile</Link>
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem>Connect Wallet</DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}