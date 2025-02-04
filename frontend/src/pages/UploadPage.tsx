import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Upload, Lock, Users, Globe } from 'lucide-react';

export default function UploadPage() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [privacy, setPrivacy] = useState<'private' | 'shared' | 'public'>('private');

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
    onDrop: (files) => {
      // Handle file upload
      console.log('Files dropped:', files);
    },
  });

  const handleUpload = async () => {
    setUploading(true);
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setProgress(i);
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    setUploading(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold">Upload Files</h1>
        <p className="text-muted-foreground mt-2">
          Drag and drop your files to upload them to OnchainVault
        </p>
      </motion.div>

      <Card>
        <CardHeader>
          <CardTitle>File Upload</CardTitle>
          <CardDescription>
            Choose files to upload and set their privacy settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors
              ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'}`}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            {isDragActive ? (
              <p className="text-lg">Drop the files here...</p>
            ) : (
              <p className="text-lg">
                Drag 'n' drop files here, or click to select files
              </p>
            )}
          </div>

          {acceptedFiles.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold">Selected Files:</h3>
              <ul className="space-y-2">
                {acceptedFiles.map((file) => (
                  <li
                    key={file.name}
                    className="flex items-center gap-2 text-sm"
                  >
                    <span>📄</span>
                    {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Privacy Setting</label>
              <Select
                value={privacy}
                onValueChange={(value: 'private' | 'shared' | 'public') =>
                  setPrivacy(value)
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="private">
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Private
                    </div>
                  </SelectItem>
                  <SelectItem value="shared">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Shared
                    </div>
                  </SelectItem>
                  <SelectItem value="public">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4" />
                      Public
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {uploading && (
              <div className="space-y-2">
                <Progress value={progress} />
                <p className="text-sm text-muted-foreground text-center">
                  Uploading... {progress}%
                </p>
              </div>
            )}

            <Button
              onClick={handleUpload}
              disabled={acceptedFiles.length === 0 || uploading}
              className="w-full"
            >
              {uploading ? 'Uploading...' : 'Upload Files'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}