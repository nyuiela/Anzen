import { motion } from 'framer-motion';
import { File } from '@/lib/store';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { FileIcon, LockIcon, UsersIcon, GlobeIcon } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';

interface FileGridProps {
   files: File[];
}

export default function FileGrid({ files }: FileGridProps) {
   if (files.length === 0) {
      return (
         <div className="text-center py-12">
            <FileIcon className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">No files found</h3>
            <p className="text-muted-foreground">Upload some files to get started</p>
         </div>
      );
   }

   return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
         {files.map((file, index) => (
            <motion.div
               key={file.id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: index * 0.1 }}
            >
               <a href={`/file/${file.id}`}>
                  <Card className="hover:shadow-lg transition-shadow">
                     <CardHeader className="relative">
                        {file.thumbnail ? (
                           <Image
                              src={file.thumbnail}
                              alt={file.name}
                              className="w-full h-48 object-cover rounded-t-lg"
                           />
                        ) : (
                           <div className="w-full h-48 bg-muted flex items-center justify-center rounded-t-lg">
                              <FileIcon className="h-12 w-12 text-muted-foreground" />
                           </div>
                        )}
                        <div className="absolute top-2 right-2">
                           {file.privacy === 'private' && (
                              <LockIcon className="h-5 w-5 text-primary" />
                           )}
                           {file.privacy === 'shared' && (
                              <UsersIcon className="h-5 w-5 text-primary" />
                           )}
                           {file.privacy === 'public' && (
                              <GlobeIcon className="h-5 w-5 text-primary" />
                           )}
                        </div>
                     </CardHeader>
                     <CardContent>
                        <h3 className="font-semibold truncate">{file.name}</h3>
                        <p className="text-sm text-muted-foreground">
                           {formatDistanceToNow(file.uploadedAt, { addSuffix: true })}
                        </p>
                     </CardContent>
                     <CardFooter className="text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                           <span>❤️ {file.likes}</span>
                           <span>💬 {file.comments}</span>
                        </div>
                     </CardFooter>
                  </Card>
               </a>
            </motion.div>
         ))}
      </div>
   );
}