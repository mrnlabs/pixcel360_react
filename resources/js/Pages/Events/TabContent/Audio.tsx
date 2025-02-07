import FileUpload from '@/Components/FileUpload'
import { Button } from '@/components/ui/button';
import { Toaster } from '@/Components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import { formatFileSize } from '@/utils/formatFileSize';
import { isAudioFile } from '@/utils/isAudioFile';
import { Loader, Play, Pause, ArrowUpFromLine } from 'lucide-react'
import React, { Suspense, useState, useRef } from 'react'

export default function Audio({event}: any) {
    const { toast } = useToast();

    const [audioFile, setAudioFile] = useState<File | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handleFileSelect = (files: File[]) => {
        // if file is not audio return
        if (!isAudioFile(files[0])) { 
            toast({
                title: "Error",
                description: "Please select an audio file.",
                variant: "destructive",
            })
            return;
         }

        // set audio file to null
        setAudioFile(null);
        if (files.length > 0) {
            const file = files[0];
            setAudioFile(file);
            const url = URL.createObjectURL(file);
            setAudioUrl(url);
        }
    };

    const handleFileRemove = () => {
        setAudioFile(null);
        setAudioUrl(null);
        setIsPlaying(false);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    const togglePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

   

    return (
        <div className="space-y-4">
            <Suspense fallback={<Loader className="mx-auto" size={20} />}>
                <FileUpload
                    onFilesSelected={handleFileSelect}
                    onFileRemove={handleFileRemove}
                    multiple={false}
                    acceptedTypes={['audio/*']}
                    maxSize={10 * 1024 * 1024} // 10MB
                    showPreview={false} 
                />
            </Suspense>
            
            {audioFile && (
                <div>
                    <ul className="list-none files-main-nav" id="files-main-nav">
                        <li>
                            <div className="flex items-center gap-2">
                                <button 
                                    onClick={togglePlayPause}
                                    className="me-0 hover:opacity-80 transition-opacity"
                                >
                                    <span className="avatar avatar-md bg-primary/10 !text-primary">
                                        {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                                    </span>
                                </button>
                                <div className="flex-1">
                                    <span className="text-sm font-medium">{audioFile.name}</span>
                                </div>
                                <div className="ms-auto">
                                    <span className="font-medium text-textmuted dark:text-textmuted/50">
                                        {formatFileSize(audioFile.size)}
                                    </span>
                                </div>
                            </div>
                        </li>
                    </ul>
                    
                    <audio 
                        ref={audioRef}
                        src={audioUrl || undefined}
                        onEnded={() => setIsPlaying(false)}
                        className="hidden"
                    />
                    <Button className="ti-btn ti-btn-primary w-full">
                    <ArrowUpFromLine />Upload</Button>
                </div>
            )}
            <Toaster />
        </div>
    )
}