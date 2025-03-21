import { Button } from "@/components/ui/button"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuPortal,
   DropdownMenuSeparator,
   DropdownMenuShortcut,
   DropdownMenuSub,
   DropdownMenuSubContent,
   DropdownMenuSubTrigger,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import CustomButton from "../customButton"
import { VaultDialog } from "../vaultDialog"

export function DropdownVault() {
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button variant="outline">Open Vault Menu</Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Vault</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
               {/* <DropdownMenuItem> */}
               {/* </DropdownMenuItem> */}
               <DropdownMenuItem>
                  <VaultDialog />
                  {/* <Button> hdi</Button> */}
                  {/* Create Group Vault */}
                  {/* <CustomButton label="Create Group Vault" /> */}
                  {/* <DropdownMenuShortcut>⌘B</DropdownMenuShortcut> */}
               </DropdownMenuItem>

            </DropdownMenuGroup>
            {/* <DropdownMenuSeparator /> */}
            {/* <DropdownMenuGroup>
               <DropdownMenuItem>Team</DropdownMenuItem>
               <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                     <DropdownMenuSubContent>
                        <DropdownMenuItem>Email</DropdownMenuItem>
                        <DropdownMenuItem>Message</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>More...</DropdownMenuItem>
                     </DropdownMenuSubContent>
                  </DropdownMenuPortal>
               </DropdownMenuSub>
               <DropdownMenuItem>
                  New Team
                  <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
               </DropdownMenuItem>
            </DropdownMenuGroup> */}
            {/* <DropdownMenuSeparator />
            <DropdownMenuItem>GitHub</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuItem disabled>API</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
               Log out
               <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem> */}
         </DropdownMenuContent>
      </DropdownMenu>
   )
}
